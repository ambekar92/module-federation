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
export const NOTIFYING_READ_MESSAGE = API_ROUTE + '/notifying-read-message'
export const DOCUMENTS_ROUTE = API_ROUTE + '/documents'
export const DOCUMENT_ROUTE = API_ROUTE + '/document'
export const QUESTIONNAIRE_ROUTE = '/questionnaire'
export const QUESTIONNAIRE_API_ROUTE = API_ROUTE + '/questionnaire'
export const WS_LIVE_NOTIFICATIONS =
  process.env.NEXT_PUBLIC_WS_LIVE_NOTIFICATIONS
export const INBOX_ROUTE = API_ROUTE + '/inbox';
export const EXTENDED_MESSAGES_ROUTE = API_ROUTE + '/extendedmessages';
export const DOCUMENT_REQUIRED_ROUTE = API_ROUTE + '/document-required-questions'
export const FIRM_APPLICATIONS_ROUTE = API_ROUTE + '/application'
export const FIRM_EVALUATIONS_ROUTE = API_ROUTE + '/evaluation'
export const OKTA_POST_LOGIN_ROUTE = API_ROUTE + '/okta-post-login'
export const ADMIN_BANNER_ROUTE = process.env.NEXT_PUBLIC_ADMIN_FEATURE_ENABLED
export const CREATING_APPLICATION_ROUTE = API_ROUTE + '/creating-program-application'
export const ELIGIBLE_APPLY_PROGRAMS_ROUTE = API_ROUTE + '/application-eligible-to-apply-programs'
export const APPLICATION_ELIGIBILITY_ROUTE = `${API_ROUTE}/application-eligibility`
export const USER_ROUTE = API_ROUTE + '/users'
export const INVITATION_ROUTE = API_ROUTE + '/invitation'
export const SEND_INVITATION_ROUTE = API_ROUTE + '/send-invitation'
export const UPDATE_APPLICATION_STATE = API_ROUTE + '/update-application-state'
export const QUESTIONNAIRE_LIST_ROUTE = '/questionnaire-list';
export const ANSWER_ROUTE = API_ROUTE + '/answer'
export const RTF_ITEMS_ROUTE = API_ROUTE + '/rtf-items';
export const DRAFT_RTF_ITEMS_ROUTE = API_ROUTE + '/draft-rtf-items';
export const ACCEPT_INVITATION_ROUTE = API_ROUTE + '/accept-invitation'
export const USER_PRODUCTIVITY_ROUTE =
  API_ROUTE + '/user-productivity-dashboard'
export const FIRM_EVALUATIONS_ADD_NOTE_ROUTE =
  API_ROUTE + '/upsert-viewflow-note'
export const ASSIGN_USER_TO_VIEWFLOW_ROUTE = API_ROUTE + '/evaluation/assign-user-to-viewflow'
export const DELEGATES_ROUTE = API_ROUTE + '/delegates'
export const APPLICATION_ROUTE = API_ROUTE + '/application'
export const TESTER_LOGIN_ROUTE = API_ROUTE + '/login'
export const USER_TASK_DASHBOARD_ROUTE = API_ROUTE + '/user-task-dashboard';
export const USER_TASKS_ROUTE = API_ROUTE + '/user-tasks';
export const APPLICATION_NOTES_ROUTE = API_ROUTE + '/application-notes';
export const NOTES_ROUTE = API_ROUTE + '/notes';
export const MESSAGES_ROUTE = API_ROUTE + '/messages';
export const THREADS_ROUTE = API_ROUTE + '/threads';
export const USER_THREADS_ROUTE = API_ROUTE + '/userthreads';
export const TASK_TIMERS_ROUTE = API_ROUTE + '/task-timers'; // fake route
export const AUDIT_ROUTE = API_ROUTE + '/activity/actions';
export const COMPLETE_EVALUATION_TASK_ROUTE = API_ROUTE + '/complete-evaluation-task';
export const REACT_GA_REPORT = process.env.UCP_TRACKING_ID
export const EVALUATING_RETURN_TO_PREV_TASK_ROUTE = API_ROUTE + '/evaluating-return-to-previous-task';
export const CLOSE_APPLICATION_ROUTE = API_ROUTE + '/close-application';
export const USER_ROLES_ROUTE =  API_ROUTE + '/prbac_roles';
export const CREATE_CONTRIBUTOR_ROUTE = API_ROUTE + '/creating-application-contributor';
export const APPLICATION_CONTRIBUTORS_ROUTE = API_ROUTE + '/application-contributors';
export const PROGRAM_APPLICATION =  API_ROUTE + '/program-application';
export const RFI_DRAFT_ROUTE = API_ROUTE + '/draft-rfi-items';
export const RFI_ITEMS_ROUTE = API_ROUTE + '/rfi-items';
export const RFI_CANCEL_ROUTE = API_ROUTE + '/cancel-rfi';
export const SUBMIT_RFI_ROUTE = API_ROUTE + '/submit-rfi';
export const CONSTANT_ROUTE = API_ROUTE + '/constants';
export const HANDLE_VBA_STATUS = API_ROUTE + '/handle-vba-review';
export const RETURN_APPLICATION_TO_FIRM = API_ROUTE + '/return-application-to-firm';
export const RTF_REQUEST_ROUTE = API_ROUTE + '/rtf-requests';
export const RFI_REQUEST_ROUTE = API_ROUTE + '/rfi-requests';
export const DOCUMENT_TEMPLATE_ROUTE = API_ROUTE + '/document_templates'
export const HTML_TO_PDF_ROUTE = API_ROUTE + '/html_to_pdf_document'
export const CHANGE_APPLICATION_TIER_ROUTE = API_ROUTE + '/change-application-tier';
export const LETTER_FOR_APPLICATION_ROUTE = API_ROUTE + '/letter-for-application';
export const REFRESH_ROUTE = API_ROUTE + '/refresh';
export const CREATE_USER_TO_USER_MESSAGE_ROUTE = API_ROUTE + '/create-user-to-user-message';
export const UPDATE_PROFILE_ROUTE = API_ROUTE + '/update-profile'
export const USER_DEMOGRAPHICS_ROUTE = API_ROUTE + '/user-demographics';
