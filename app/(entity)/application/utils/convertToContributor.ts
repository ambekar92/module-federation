import { Answer } from '@/app/shared/types/questionnaireTypes';
import { Contributor } from '../components/contributor-invite/types';
import { calculateOwnerEligibility } from './calculateEligiblePrograms';
import { getOwnershipPropertyValue } from './getOwnershipPropertyValue';

export function convertOwnerAnswerToContributors(answer: Answer): Contributor[] {
  if (!answer.value.answer || !Array.isArray(answer.value.answer)) {
    return [];
  }

  return answer.value.answer.map((row: any): Contributor => {
    const firstName = getOwnershipPropertyValue(row, 'first_name_owner_and_management');
    const lastName = getOwnershipPropertyValue(row, 'last_name_owner_and_management');
    const emailAddress = getOwnershipPropertyValue(row, 'email_owner_and_management');
    const ownershipPercent = parseFloat(getOwnershipPropertyValue(row, 'ownership_percentage_owner_and_management') || '0');
    const gender = getOwnershipPropertyValue(row, 'gender_owner_and_management');
    const veteranStatus = getOwnershipPropertyValue(row, 'veteran_status_owner_and_management');
    const socialDisadvantagesValue = getOwnershipPropertyValue(row, 'individual_contributor_eight_a_social_disadvantage_owner_and_management');
    const socialDisadvantages = typeof socialDisadvantagesValue === 'string' ? socialDisadvantagesValue.split(',') : [];

    const isEligibleOwner = calculateOwnerEligibility({
      gender,
      veteranStatus,
      socialDisadvantages,
    });

    let contributorRole: Contributor['contributorRole'] = 'role_owner';
    if (isEligibleOwner && ownershipPercent >= 51) {
      contributorRole = 'role_owner_eligible';
    }

    return {
      contributorRole,
      firstName,
      lastName,
      emailAddress,
    };
  });
}

export function convertOperatorAnswerToContributors(answer: Answer): Contributor[] {
  if (!answer.value.answer || !Array.isArray(answer.value.answer)) {
    return [];
  }

  return answer.value.answer.map((row: any): Contributor => {
    const firstName = getOwnershipPropertyValue(row, 'legal_management_team_first_name_control_and_operation');
    const lastName = getOwnershipPropertyValue(row, 'legal_management_team_last_name_control_and_operation');
    const emailAddress = getOwnershipPropertyValue(row, 'legal_management_team_email_control_and_operation');
    const contributorRole = 'role_other';

    return {
      contributorRole,
      firstName,
      lastName,
      emailAddress,
    };
  });
}
