import { axiosInstance } from './fetcher';

export type CmbResponseType = {
  message: string;
  sam_business_type: string;
  sam_entity_structure: string;
  primary_naics: string;
  sam_entity: {
    sam_entity_id: number;
    legal_business_name: string;
    uei: string;
    cage_code: string;
    account_hash: string;
    tax_identifier_number: string;
    dba_name: string;
    physical_address_1: string;
    physical_address_2: string;
    physical_city: string;
    naics_code_string: string;
    mailing_address_state_or_province: string;
    physical_zip_code_5: string;
    sam_extract_code: string;
    entity_structure: string;
    govt_bus_poc_first_name: string;
    govt_bus_poc_last_name: string;
  };
};

export type CmbResponse = CmbResponseType & { message: string };

export const cmbFetcherGET = async (url: string): Promise<CmbResponse> => {
  const response = await axiosInstance.get<CmbResponse>(url);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error('API call unsuccessful');
  }
};
