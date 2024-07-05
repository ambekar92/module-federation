import { useEffect } from 'react';
import { useApplicationDispatch } from '../redux/hooks';
import {
  setOwnershipPercentageTotal,
  setOwners,
  setContributors,
  setOperators
} from '../redux/applicationSlice';
import { Contributor } from '../components/contributor-invite/types';
import { Operator } from '../components/control-and-operations/schema';
import { Owner } from '../components/ownership/shared/types';

export type UserApplicationInfo = {
  totalPercent: number;
  owners: Owner[];
  contributors: Contributor[];
  operators: Operator[];
};

export const useUserApplicationInfo = () => {
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    const userApplicationInfo = localStorage.getItem('userApplicationInfo');
    if (userApplicationInfo) {
      const { totalPercent, owners, contributors, operators } = JSON.parse(userApplicationInfo) as UserApplicationInfo;
      if (totalPercent) {
        dispatch(setOwnershipPercentageTotal(totalPercent));
      }
      if (owners) {
        dispatch(setOwners(owners));
      }
      if (contributors) {
        dispatch(setContributors(contributors));
      }
      if (operators) {
        dispatch(setOperators(operators));
      }
    }
  }, [dispatch]);

  const updateUserApplicationInfo = (partialUpdate: Partial<UserApplicationInfo>) => {
    const existingInfo = JSON.parse(localStorage.getItem('userApplicationInfo') || '{}');
    const updatedInfo = { ...existingInfo, ...partialUpdate };
    localStorage.setItem('userApplicationInfo', JSON.stringify(updatedInfo));

    // Dispatch updates to Redux store
    if (partialUpdate.totalPercent !== undefined) {
      dispatch(setOwnershipPercentageTotal(partialUpdate.totalPercent));
    }
    if (partialUpdate.owners !== undefined) {
      dispatch(setOwners(partialUpdate.owners));
    }
    if (partialUpdate.contributors !== undefined) {
      dispatch(setContributors(partialUpdate.contributors));
    }
    if (partialUpdate.operators !== undefined) {
      dispatch(setOperators(partialUpdate.operators));
    }

    return updatedInfo;
  };

  return { updateUserApplicationInfo };
};

export const convertOwnerToContributor = (owner: Owner): Contributor => {
  if (owner.ownerType === 'individual') {
    return {
      contributorRole: 'role_owner',
      firstName: owner.firstName,
      lastName: owner.lastName,
      emailAddress: owner.contactInfo.email,
    };
  } else {
    return {
      contributorRole: 'role_owner',
      emailAddress: owner.contactInfo.email,
    };
  }
};
