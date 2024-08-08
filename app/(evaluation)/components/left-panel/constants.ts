import { NavItem } from '../../types/types';
export const getAnalystQuestionnaires = () => [
  '/analyst-questionnaire-ownership',
  '/analyst-questionnaire-control',
  '/analyst-questionnaire-size-and-additional-questions',
  '/analyst-questionnaire-economic-disadvantage',
  '/analyst-questionnaire-potential-for-success',
  '/analyst-questionnaire-social-disadvantage'
];

export const getStaticNavItems = (application_id: string): NavItem[] => [
  {
    section: 'Firm Summary',
    child: [{ section: 'Firm Summary', url: `${application_id}/business-summary`, title: 'Business Summary' }]
  },
  {
    section: 'Documents',
    child: [{ section: 'Documents', url: `${application_id}/documents`, title: 'Documents' }]
  },
  {
    section: 'Analysis',
    child: [{ section: 'Analysis', url: `${application_id}/analysis`, title: 'Analysis' }]
  },
  {
    section: 'Notes',
    child: [{ section: 'Notes', url: `${application_id}/notes`, title: 'Notes' }]
  },
  {
    section: 'Messages',
    child: [{ section: 'Messages', url: `${application_id}/messages`, title: 'Messages' }]
  },
  {
    section: 'Audit',
    child: [{ section: 'Audit', url: `${application_id}/audit`, title: 'Audit' }]
  },
  {
    section: 'Task Timers',
    child: [{ section: 'Task Timers', url: `${application_id}/task-timers`, title: 'Task Timers' }]
  }
]

export const actionOptions = ['Screener: Accept for Review', 'Close Application', 'Return Application',
  'Make Recommendation', 'Make an Approval', 'Complete Review', 'Request Expert Opinion', 'Confirm Veteran Status',
  'Change Tier', 'Expert: Provide Opinion', 'Analyst: Reassign User', 'Reviewer: Reassign User', 'Screener: Reassign Case',
  'Approver: Reassign Approver',
] as const;

export type ActionOptions = typeof actionOptions[number];
