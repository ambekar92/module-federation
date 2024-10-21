import { QaQuestionsType } from '@/app/shared/types/questionnaireTypes';
import { GridRow } from '../qa-helpers/OwnershipQaGrid';
import { useEffect, useState } from 'react';

export const useCheckOwnersPercent = (ownershipData: QaQuestionsType) => {
  const [totalOwnershipPercentage, setTotalOwnershipPercentage] = useState(0);
  const getFieldValue = (row: GridRow, fieldName: string): string | string[] => {
    const fullFieldName = Object.keys(row).find(key => key.startsWith(fieldName));
    return fullFieldName ? row[fullFieldName] : '';
  };

  useEffect(() => {
    const individualQuestion = ownershipData.find(q => q.name.includes('personal_information_owner_and_management'))
    const organizationQuestion = ownershipData.find(q => q.name.includes('organization_information_owner_and_management'))
    const individualAnswers = individualQuestion?.answer?.value?.answer as unknown as GridRow[] || [];
    const organizationAnswers = organizationQuestion?.answer?.value?.answer as unknown as GridRow[] || [];
    const answers = [...individualAnswers, ...organizationAnswers];

    // Calculate total ownership percentage
    const totalPercentage = answers.reduce((sum, row) => {
      const percentage = parseFloat(
        row.owner_type === 'Individual'
          ? getFieldValue(row, 'ownership_percentage') as string
          : getFieldValue(row, 'organization_ownership_percentage') as string
      ) || 0;
      return sum + percentage;
    }, 0);
    setTotalOwnershipPercentage(totalPercentage);
  }, [ownershipData]);

  return { totalOwnershipPercentage };
}
