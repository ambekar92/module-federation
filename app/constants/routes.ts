export const API_ROUTE = process.env.NEXT_PUBLIC_API_URL
export const KAFKA_ROUTE = '/api/kafka/produce'
export const DOCUMENT_TYPES_ENDPOINT = API_ROUTE + '/document-types'
export const DOCUMENT_CATEGORIES_ROUTE = API_ROUTE + '/document-categories'
export const GET_ENTITY_DATA = (uei: string, tin: string,
  cageCode: string, bankAccountNumber: string) =>
  `/validate-sam-with-entity-data?uei=${uei}&tax_identifier_number=${tin}&cage_code=${cageCode}&account_hash=${bankAccountNumber}`
export const ENTITIES_ROUTE = API_ROUTE + '/entities'
export const GET_NOTIFICATION = API_ROUTE + '/notifications'
export const GET_DOCUMENTS = API_ROUTE + '/documents'
export const GET_USER_PROFILE = API_ROUTE + '/users/'
export const QUESTIONNAIRE_ROUTE = API_ROUTE + '/questionnaire'
export const WS_LIVE_NOTIFICATIONS = process.env.NEXT_PUBLIC_WS_LIVE_NOTIFICATIONS;
export const DOCUMENT_REQUIRED_ROUTE = API_ROUTE+'/document-required-questions/1'