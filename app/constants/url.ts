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
export const APPLICATION_PREVIEW_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193241633/Application+Preview'
export const TIPS_FOR_SUCCESS_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193241648/Tips+for+Success'
export const QUICK_START_GUIDE_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193536535/Quick+Start+Guide'
export const PREPARE_LINK = '/resources/get-ready'
export const GATHER_DOCUMENTS_LINK =
  'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3193700379/Gather+Documents'
export const FIRM_APPLICATION_DONE_PAGE =
  '/firm/application/:application_id/done'
export const USER_DASHBOARD_PAGE = '/user/dashboard'
export const REVIEWERS_DASHBOARD_PAGE = '/user/dashboard/reviewers'
export const TASKS_DASHBOARD_PAGE = '/user/dashboard/tasks'
export const ASSIGN_DELEGATE_PAGE = '/application/assign-a-delegate/:applicationId'
export const QUESTIONNAIRE_PAGE = '/application/questionnaire/:applicationId/:section'
export const QUESTIONNAIRE_LIST_PAGE = '/application/questionnaire/:applicationId'
export const USER_PROFILE_PAGE = '/user'

export const buildRoute = (template: any, params: any) => {
  let route = template
  for (const [key, value] of Object.entries(params)) {
    route = route.replace(`:${key}`, value)
  }
  return route
}
