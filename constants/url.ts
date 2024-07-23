export const CLAIM_YOUR_BUSINESS = '/claim-your-business';
export const SELECT_INTENDED_PROGRAMS = '/application/select-intended-programs/1'; // temp number
export const DASHBOARD = '/dashboard';
export const ADMIN_DASHBOARD = '/admin/dashboard';
export const FIRM_EVALUATION_PAGE = '/firm/application/:application_id/evaluation';
export const APPLICATION_STEP_ROUTE = '/application/:contributorId:stepLink';

export const buildRoute = (template: any, params: any) => {
  let route = template;
  for (const [key, value] of Object.entries(params)) {
    route = route.replace(`:${key}`, value);
  }
  return route;
};
