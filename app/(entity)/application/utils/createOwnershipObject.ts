import { OwnerType } from '../hooks/useOwnershipApplicationInfo';
import { GridRow } from '../qa-helpers/OwnershipQaGrid';

const getFieldValue = (row: GridRow, fieldName: string): string | string[] => {
  const fullFieldName = Object.keys(row).find(key => key.includes(fieldName));
  return fullFieldName ? row[fullFieldName] : '';
};

export const createOwnerObject = (row: GridRow): OwnerType | null => {
  if (row.owner_type === 'Individual') {
    return {
      ownerType: 'Individual',
      firstName: String(getFieldValue(row, 'first_name')),
      lastName: String(getFieldValue(row, 'last_name')),
      ownershipPercent: String(getFieldValue(row, 'ownership_percentage')),
      emailAddress: String(getFieldValue(row, 'email')),
      socialDisadvantages: Array.isArray(getFieldValue(row, 'individual_contributor_eight_a_social_disadvantage'))
        ? getFieldValue(row, 'individual_contributor_eight_a_social_disadvantage') as string[]
        : [],
      citizenship: String(getFieldValue(row, 'citizenship')),
      gender: String(getFieldValue(row, 'gender')),
      veteranStatus: String(getFieldValue(row, 'veteran_status')),
    };
  } else if (row.owner_type === 'Organization') {
    return {
      ownerType: 'Organization',
      organizationName: String(getFieldValue(row, 'organization_name')),
      ownershipPercent: String(getFieldValue(row, 'organization_ownership_percentage')),
      emailAddress: String(getFieldValue(row, 'organization_email')),
    };
  }
  return null;
};
