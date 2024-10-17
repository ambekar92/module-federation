export type BusinessEntity = {
    controlling_entity_type_id: ParentEntityType; 
    id: number;
    legal_business_name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    parent_id: number | null;
    owner_user_id: number | null;
    notes: string;
  };

 export enum ParentEntityType {
    AIT = 'AIT',
    NHO = "NHO",
    ANC = "ANC",
    CDC = "CDC",
    AGCO = "AGCO"
  }
  