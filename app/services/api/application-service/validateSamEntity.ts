'use server'
import { ClaimBusinessInputs, CmbResponseType } from '@/app/(entity)/claim-your-business/utils/types';
import { VALIDATE_SAM_ENTITY_ROUTE } from '@/app/constants/routes';
import { axiosInstance } from '../../axiosInstance';

/**
 * Validate a SAM entity by making a GET request to the validate-sam-entity route
 * @param formData - The user's input data, including UEI, TIN, cage code, and bank account number
 * @returns A promise of the response from the server, which is a CmbResponseType object
 * @throws An error if the request fails
 */
export async function validateSamEntity(formData: ClaimBusinessInputs): Promise<CmbResponseType> {
  const { uei, tin, cageCode, bankAccountNumber } = formData;

  const params = new URLSearchParams({
    uei: uei || '',
    tax_identifier_number: tin || '',
    cage_code: cageCode || '',
    account_hash: bankAccountNumber || ''
  });

  const url = `${VALIDATE_SAM_ENTITY_ROUTE}?${params.toString()}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error validating SAM entity:', error);
    }
    throw error;
  }
}
