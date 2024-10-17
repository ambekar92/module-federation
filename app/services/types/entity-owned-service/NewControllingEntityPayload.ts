export type NewControllingEntityPayload  = {
  controlling_entity_type_id: string;
  legal_business_name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  owner_user_id: string;
  notes?: string;
  parent_id: string;
};

export type NewControllingEntityUserInfoPayload = {
  application_id: string;
  email: string;
  entity_id: string;
  application_role_id?: number;
  first_name: string;
  last_name: string;
};
