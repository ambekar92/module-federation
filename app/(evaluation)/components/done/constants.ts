import { FIRM_EVALUATION_PAGE, USER_DASHBOARD_PAGE } from '@/app/constants/url';

export const firmDoneData = [
  {
    name: 'request-for-information',
    header: 'Request for Information sent',
    alertText: 'Request for Information has been sent.',
    body: 'You’ve successfully sent a Request for Information. The business will receive a notification and you can visit the application landing page to take additional actions on this request.',
    buttonText: 'Return to Application',
    buttonLink: FIRM_EVALUATION_PAGE
  },
  {
    name: 'return-to-business',
    header: 'Return to Business sent',
    alertText: 'Return to Business has been sent.',
    body: 'You’ve successfully returned this application to the business and it has been removed from your dashboard. The business will receive a notification and once they re-submit, the application will be automatically assigned back to you for continued screening.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'application-closed',
    header: 'Application closed',
    alertText: 'This application has been closed.',
    body: 'You’ve successfully closed this application. It has been removed from your dashboard and the business will receive a notification of the closure.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'completed-screening',
    header: 'You’ve completed screening!',
    alertText: 'Screening complete.',
    body: 'You’ve successfully completed the screening process on this application. It is now being routed to the next available Analyst for further review.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'made-recommendation',
    header: 'You’ve made a recommendation!',
    alertText: 'Recommendation complete.',
    body: 'You’ve successfully completed the analysis process on this application and have made your recommendation. It is now being routed to the next available Reviewer for further processing.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'completed-review',
    header: 'You’ve completed your review!',
    alertText: 'Review complete.',
    body: 'You’ve successfully completed the review process on this application. A decision letter has been sent to the business.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'completed-approval',
    header: 'You’ve completed an approval!',
    alertText: 'Approval complete.',
    body: 'You’ve successfully completed the approval process on this application.  A decision letter has been sent to the business.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'reassignment-complete',
    header: 'Reassignment complete.',
    alertText: 'Reassignment complete.',
    body: 'You’ve successfully reassigned this application. It has been removed from your dashboard. ',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'returned-application',
    header: 'You’ve returned this application to the previous stage of review!',
    alertText: 'The application has been returned to the previous stage.',
    body: 'You’ve successfully returned this application to the person it was assigned to (prior to you) in the previous stage of review. It has been removed from your dashboard.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'escalate-review',
    header: 'You’ve escalated the review!',
    alertText: 'Request sent.',
    body: 'You’ve successfully escalated the review. It will no longer be assigned to you. Once the expert provides a response the application will be reassigned back to you.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'provided-expert-opinion',
    header: 'You’ve provided your professional opinion!',
    alertText: 'Response sent.',
    body: 'You’ve successfully provided your response to an expert opinion request. It has been reassigned back to the person who made the request and has been removed from your dashboard.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  },
  {
    name: 'confirmed-veteran-status',
    header: 'Veteran status confirmed.',
    alertText: 'Veteran status has been confirmed.',
    body: 'You’ve successfully confirmed this business owner’s  Veteran status. You can continue screening this application.',
    buttonText: 'Return to Application',
    buttonLink: FIRM_EVALUATION_PAGE
  },
  {
    name: 'changed-tier',
    header: 'You’ve changed the tier of this application!',
    alertText: 'Application tier has been changed.',
    body: 'You’ve successfully changed the tier of this application. It is now being routed to the appropriate person.',
    buttonText: 'Return to your Dashboard',
    buttonLink: USER_DASHBOARD_PAGE
  }
]
