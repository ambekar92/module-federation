export const CLAIM_YOUR_BUSINESS = '/claim-your-business'
export const SELECT_INTENDED_PROGRAMS_PAGE =
  '/application/select-intended-programs/:entity_id'
export const SELECT_ENTITY_OWNED = '/entity-owned'
export const DASHBOARD = '/dashboard'
export const ADMIN_DASHBOARD = '/admin/dashboard'
export const FIRM_EVALUATION_PAGE =
  '/firm/application/:application_id/evaluation'
export const APPLICATION_STEP_ROUTE = '/application/:applicationId:stepLink'
export const INITIAL_APPLICATION_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/edit-v2/3193700407?draftShareId=1a714a35-0807-45f0-ac5d-8182ccfc9abb'
// export const APPLICATION_PREVIEW_LINK =
//   'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193241633/Application+Preview'
export const APPLICATION_PREVIEW_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3292463118/Full+Application+Preview'
export const TIPS_FOR_SUCCESS_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193241648/Tips+for+Success'
export const QUICK_START_GUIDE_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193536535/Quick+Start+Guide'
export const PREPARE_LINK = '/resources/get-ready'
export const GATHER_DOCUMENTS_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193700379/Gather+Documents'
export const FIRM_APPLICATION_DONE_PAGE =
  '/firm/application/:application_id/done'
export const REVIEWERS_DASHBOARD_PAGE = '/user/dashboard/reviewers'
export const TASKS_DASHBOARD_PAGE = '/user/dashboard/tasks'
export const DELEGATE_DASHBOARD_PAGE = '/dashboard/delegate'
export const CONTRIBUTOR_DASHBOARD_PAGE = '/user/dashboard/contributor'
export const ASSIGN_DELEGATE_PAGE = '/application/assign-a-delegate/:applicationId'
export const QUESTIONNAIRE_PAGE = '/application/questionnaire/:applicationId/:section'
export const QUESTIONNAIRE_LIST_PAGE = '/application/questionnaire/:applicationId'
export const USER_PROFILE_PAGE = '/user'
export const MESSAGE_PAGE = '/messages'
export const NOTES_PAGE = '/firm/application/:applicationId/notes'
export const DOCUMENT_PAGE = '/documents'
export const APPILCATION = '/application'
export const APPLICATION_QUESTIONNAIRE_LIST_PAGE = '/application/questionnaire/:applicationId'
export const APPLICATION_VIEW_PAGE = '/application/view/:applicationId'
export const NOTIFICATIONS_PAGE = '/notifications';
export const GET_HELP_ROUTE = '/help';
export const CALCULATOR_DEMO_SBA_ONE_ROUTE = 'https://calculator.demo.sba-one.net/';
export const SBAONE_ATLASSIAN_SPACES_ROUTE = 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/overview/';
export const FEDERAL_CONTRACTING_ASSISTANCE_PROGRAMS_ROUTE = 'https://www.sba.gov/federal-contracting/contracting-assistance-programs';
export const RESOURCES_GET_READY_ROUTE = '/resources/get-ready';
export const RESOURCES_ROUTE = '/resources';
export const CERTIFICATION_SBA_ROUTE = 'https://certification.sba.gov';

export const buildRoute = (template: any, params: any) => {
  let route = template
  for (const [key, value] of Object.entries(params)) {
    route = route.replace(`:${key}`, value)
  }
  return route
}
