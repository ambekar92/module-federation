import { API_ROUTE, QUESTIONNAIRE_ROUTE } from './routes'

// A User's Questionnaires
export const QUESTIONNAIRE_LIST_ROUTE = API_ROUTE + '/questionnaire-list'

// Grid Routes
export const OWNER_AND_MANAGEMENT = QUESTIONNAIRE_ROUTE + '/47/owner-and-management';
export const CONTROL_AND_OPERATIONS_ROUTE = QUESTIONNAIRE_ROUTE + '/48/control-and-operation'

// Individual Questions
export const CORE_FEDERAL_RELATIONSHIPS = QUESTIONNAIRE_ROUTE + '/16/core-federal-relationships';
export const PROGRAM_ELIGIBILITY = QUESTIONNAIRE_ROUTE + '/9/core-program-eligibility';
export const BUSINESS_INFORMATION = QUESTIONNAIRE_ROUTE + '/11/core-business-information';
export const CONTACT_INFORMATION = QUESTIONNAIRE_ROUTE + '/145/identifying-and-contact-information';
export const BUSINESS_RELATIONSHIPS = QUESTIONNAIRE_ROUTE + '/20/core-business-relationships';

export const CONTACT_INFO_ROUTE = QUESTIONNAIRE_ROUTE + '/13/core-identifying-and-contact-information';
export const FEDERAL_RELATIONSHIP_ROUTE = QUESTIONNAIRE_ROUTE + '/16/core-federal-relationships';
export const BUSINESS_RELATIONSHIP_ROUTE = QUESTIONNAIRE_ROUTE + '/20/core-business-relationships';

// 8(a)
export const EIGHTA_SPECIFIC_ROUTE = QUESTIONNAIRE_ROUTE + '/1/eight-a-specific';
export const EIGHTA_PRIOR_INVOLVEMENT_ROUTE = QUESTIONNAIRE_ROUTE + '/22/eight-a-prior-familial-involvement';
export const EIGHTA_CHARACTER_ROUTE = QUESTIONNAIRE_ROUTE + '/23/eight-a-character';
export const EIGHTA_SOCIAL_DISADVANTAGE_ROUTE = QUESTIONNAIRE_ROUTE + '/25/eight-a-social-disadvantage';
export const EIGHTA_ECONOMIC_DISADVANTAGE_ROUTE = QUESTIONNAIRE_ROUTE + '/26/economic-disadvantage';

// Wosb
export const WOSB_QA_ROUTE = QUESTIONNAIRE_ROUTE + '/3/wosb-specific';

// VetCert
export const VETCERT_QA_ROUTE = QUESTIONNAIRE_ROUTE + '/5/vetcert-specific';

export const SEND_INVITATION_DELEGATE = API_ROUTE + '/send-invitation-to-delegate';
