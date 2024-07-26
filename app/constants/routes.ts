export const API_ROUTE = process.env.NEXT_PUBLIC_API_URL
export const KAFKA_ROUTE = '/api/kafka/produce'
export const DOCUMENT_TYPES_ENDPOINT = API_ROUTE + '/document-types'
export const DOCUMENT_CATEGORIES_ROUTE = API_ROUTE + '/document-categories'
export const UNCLAIMED_ENTITY_ROUTE = API_ROUTE + '/unclaimed-entity'
export const VALIDATE_SAM_ENTITY_ROUTE =
  API_ROUTE + '/validate-sam-with-entity-data'
export const ENTITIES_ROUTE = API_ROUTE + '/entities'
export const ENTITY_ROUTE = API_ROUTE + '/entity'
export const GET_NOTIFICATION = API_ROUTE + '/notifications'
export const GET_DOCUMENTS = API_ROUTE + '/documents'
export const QUESTIONNAIRE_ROUTE = API_ROUTE + '/questionnaire'
export const WS_LIVE_NOTIFICATIONS =
  process.env.NEXT_PUBLIC_WS_LIVE_NOTIFICATIONS
export const INBOX_ROUTE = API_ROUTE + '/inbox'
export const DOCUMENT_REQUIRED_ROUTE =
  API_ROUTE + '/document-required-questions'
export const FIRM_APPLICATIONS_ROUTE = API_ROUTE + '/application'
export const FIRM_EVALUATIONS_ROUTE = API_ROUTE + '/evaluation'
export const OKTA_POST_LOGIN_ROUTE = API_ROUTE + '/okta-post-login'
export const ADMIN_BANNER_ROUTE = process.env.NEXT_PUBLIC_ADMIN_FEATURE_ENABLED
export const CREATING_APPLICATION_ROUTE = API_ROUTE + '/creating-program-application'
export const ELIGIBLE_APPLY_PROGRAMS_ROUTE = API_ROUTE + '/application-eligible-to-apply-programs'
export const USER_ROUTE = API_ROUTE + '/users'
export const INVITATION_ROUTE = API_ROUTE + '/invitation'
export const UPDATE_APPLICATION_STATE = API_ROUTE + '/update-application-state'
export const APPLICATION_CONTRIBUTOR_ROUTE = API_ROUTE + '/application-contributors'
export const QUESTIONNAIRE_LIST_ROUTE = API_ROUTE + '/questionnaire-list';
export const ANSWER_ROUTE = API_ROUTE + '/answer'

export const ACCEPT_INVITATION_ROUTE = API_ROUTE + '/accept-invitation'
export const USER_PRODUCTIVITY_ROUTE =
  API_ROUTE + '/user-productivity-dashboard'
export const FIRM_EVALUATIONS_ADD_NOTE_ROUTE =
  API_ROUTE + '/upsert-viewflow-note'
export const ASSIGN_USER_TO_VIEWFLOW_ROUTE = API_ROUTE + '/assign-user-to-viewflow'
export const DELEGATES_ROUTE = API_ROUTE + '/delegates'
export const APPLICATION_ROUTE = API_ROUTE + '/application'
export const TESTER_LOGIN_ROUTE = API_ROUTE + '/login'
export const USER_TASK_DASHBOARD_ROUTE = API_ROUTE + '/user-task-dashboard';
export const APPLICATION_NOTES_ROUTE = API_ROUTE + '/application-notes';
export const NOTES_ROUTE = API_ROUTE + '/notes';
export const MESSAGES_ROUTE = API_ROUTE + '/messages';
export const THREADS_ROUTE = API_ROUTE + '/threads';
export const TASK_TIMERS_ROUTE = API_ROUTE + '/task-timers'; // this route does not exist, it is a placeholder
export const AUDIT_ROUTE = API_ROUTE + '/audit'; // this route does not exist, it is a placeholder [mdev]
export const COMPLETE_EVALUATION_TASK = API_ROUTE + '/complete-evaluation-task';
export const REACT_GA_REPORT = process.env.UCP_TRACKING_ID