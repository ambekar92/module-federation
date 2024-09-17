import { ProgramOption, sbaProgramOptions } from '@/app/constants/sba-programs';
import { useEffect, useState } from 'react';

export type OwnerType = {
  ownerType: 'Individual' | 'Organization';
  ownershipPercent: string;
  emailAddress: string;
  isEligibleOwner?: boolean;
} & (
  | {
      ownerType: 'Individual';
      firstName: string;
      lastName: string;
      socialDisadvantages: string[];
      citizenship: string;
      gender: string;
      veteranStatus: string;
    }
  | {
      ownerType: 'Organization';
      organizationName: string;
    }
);

export type OwnerApplicationInfo = {
  totalPercent: number;
  owners: OwnerType[];
};

export const useOwnerApplicationInfo = () => {
  const [ownerApplicationInfo, setOwnerApplicationInfo] = useState<OwnerApplicationInfo>({
    totalPercent: 0,
    owners: [],
  });

  useEffect(() => {
    const storedInfo = localStorage.getItem('ownerApplicationInfo');
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      const updatedOwners = parsedInfo.owners.map((owner: OwnerType) => ({
        ...owner,
        isEligibleOwner: owner.isEligibleOwner ?? calculateEligibleSbaPrograms([owner]).length > 0,
      }));
      setOwnerApplicationInfo({ ...parsedInfo, owners: updatedOwners });
    }
  }, []);

  const updateOwnerApplicationInfo = (updatedInfo: Partial<OwnerApplicationInfo>) => {
    const newInfo = { ...ownerApplicationInfo, ...updatedInfo };
    setOwnerApplicationInfo(newInfo);
    localStorage.setItem('ownerApplicationInfo', JSON.stringify(newInfo));
    return newInfo;
  };

  const updateOwners = (owners: OwnerType[]) => {
    const totalPercent = owners.reduce((sum, owner) => sum + parseFloat(owner.ownershipPercent), 0);
    updateOwnerApplicationInfo({ owners, totalPercent });
  };

  const addOwner = (owner: OwnerType) => {
    const isEligibleOwner = calculateEligibleSbaPrograms([owner]).length > 0;
    const newOwner: OwnerType = { ...owner, isEligibleOwner };
    const newOwners = [...ownerApplicationInfo.owners, newOwner];
    const newTotalPercent = newOwners.reduce((sum, o) => sum + parseFloat(o.ownershipPercent), 0);
    updateOwnerApplicationInfo({
      owners: newOwners,
      totalPercent: newTotalPercent,
    });
  };

  const removeOwner = (index: number) => {
    const newOwners = ownerApplicationInfo.owners.filter((_, i) => i !== index);
    const newTotalPercent = newOwners.reduce((sum, o) => sum + parseFloat(o.ownershipPercent), 0);
    updateOwnerApplicationInfo({
      owners: newOwners,
      totalPercent: newTotalPercent,
    });
  };

  return {
    ownerApplicationInfo,
    updateOwnerApplicationInfo,
    addOwner,
    removeOwner,
    updateOwners
  };
};

/**
 * Given an array of owners, returns an array of SBA programs that they are eligible for.
 * A program is considered eligible if any of the owners have a social disadvantage that
 * matches one of the program's disadvantages.
 * @param owners The array of owners to check eligibility for.
 * @returns An array of program options that the owners are eligible for.
 */
export const calculateEligibleSbaPrograms = (owners: OwnerType[]): ProgramOption[] => {
  const eligiblePrograms = sbaProgramOptions.filter((program) => {
    return owners.some(owner => {
      if (owner.ownerType !== 'Individual') {
        return false;
      }

      let updatedDisadvantages = owner.socialDisadvantages.length > 0
        ? owner.socialDisadvantages
        : ['Not Claiming Social Disadvantage'];

      // Remove 8(a) if 'Not Claiming Social Disadvantage' is selected
      if (updatedDisadvantages.includes('Not Claiming Social Disadvantage') && program.name === '8(a) Business Development') {
        return false;
      }

      if (updatedDisadvantages.length > 1) {
        updatedDisadvantages = updatedDisadvantages.filter(d => d !== 'Not Claiming Social Disadvantage');
      }

      const manageDisadvantage = (condition: boolean, disadvantage: string) => {
        if (condition && !updatedDisadvantages.includes(disadvantage)) {
          updatedDisadvantages.push(disadvantage);
        } else if (!condition) {
          updatedDisadvantages = updatedDisadvantages.filter(d => d !== disadvantage);
        }
      };

      manageDisadvantage(owner.gender === 'F', 'female');
      manageDisadvantage(owner.veteranStatus === 'Veteran', 'veteran');
      manageDisadvantage(owner.veteranStatus === 'Service-Disabled Veteran', 'disabled_veteran');

      const mappedDisadvantages = updatedDisadvantages.map(disadvantage => {
        switch (disadvantage) {
          case 'Black American':
            return ['race', 'black_american', 'minority'];
          case 'Hispanic American':
            return ['race', 'hispanic_american', 'minority'];
          case 'Native American':
            return ['race', 'native_american', 'minority'];
          case 'Asian Pacific American':
            return ['race', 'asian_pacific_american', 'minority'];
          case 'Race':
            return ['race', 'minority'];
          case 'Ethnic Origin':
            return 'ethnic_origin';
          case 'Gender':
            return ['gender', 'woman', 'female'];
          case 'Long term residence in an environment isolated from mainstream of American society.':
            return 'long_term_isolated_residence';
          default:
            return disadvantage.toLowerCase();
        }
      });

      const flatMappedDisadvantages = mappedDisadvantages.flat();
      return program.disadvantages.some(disadvantage => flatMappedDisadvantages.includes(disadvantage));
    });
  });

  // Add HUBZone if not already included
  const hubZoneProgram = sbaProgramOptions.find(program => program.name === 'HUBZone');
  if (hubZoneProgram && !eligiblePrograms.some(program => program.name === 'HUBZone')) {
    eligiblePrograms.push(hubZoneProgram);
  }

  return eligiblePrograms;
};
