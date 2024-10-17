import { NavItem } from '../../types/types';
export const getAnalystQuestionnaires = (programApplications: any[]) => {
  const baseQuestionnaires = [
    '/analyst-questionnaire-ownership',
    '/analyst-questionnaire-control',
    '/analyst-questionnaire-additional-questions',
  ];

  const programSpecificQuestionnaires = [];

  const hasProgram = (programName: string) =>
    programApplications.some(app => app.programs.name === programName);

  if (hasProgram('eight_a') || hasProgram('ed_wosb')) {
    programSpecificQuestionnaires.push('/analyst-questionnaire-economic-disadvantage');
  }

  if (hasProgram('eight_a')) {
    programSpecificQuestionnaires.push(
      '/analyst-questionnaire-eight-a-specific',
      '/analyst-questionnaire-social-disadvantage'
    );
  }

  if (hasProgram('hubzone')) {
    programSpecificQuestionnaires.push('/analyst-questionnaire-hubzone-specific');
  }

  return [...baseQuestionnaires, ...programSpecificQuestionnaires];
};

export const ownershipQuestionnaire = '/owner-and-management'

export const controlAndOperationQuestionnaire = '/control-and-operation'

export const getStaticNavItems = (application_id: string): NavItem[] => [
  {
    section: 'Business Summary',
    child: [{id: 1, section: 'Business Summary', url: `${application_id}/business-summary`, title: 'Business Summary' }]
  },
  {
    section: 'Documents',
    child: [{id: 2, section: 'Documents', url: `${application_id}/documents`, title: 'Documents' }]
  },
  {
    section: 'Controlling Entity',
    child: [{ section: 'Controlling Entity', url: `${application_id}/controlling-entity`, title: 'Controlling Entity' }]
  },
  {
    section: 'Notes',
    child: [{id: 3, section: 'Notes', url: `${application_id}/notes`, title: 'Notes' }]
  },
  {
    section: 'Messages',
    child: [{id: 4, section: 'Messages', url: `${application_id}/messages`, title: 'Messages' }]
  },
  {
    section: 'Audit',
    child: [{id: 5, section: 'Audit', url: `${application_id}/audit`, title: 'Audit' }]
  },
  {
    section: 'Task Timers',
    child: [{id: 6, section: 'Task Timers', url: `${application_id}/task-timers`, title: 'Task Timers' }]
  }
]

export const actionOptions = ['Screener: Accept for Review', 'Close Application', 'Return Application',
  'Make Recommendation', 'Make an Approval', 'Complete Review', 'Escalate Review', 'Confirm Veteran Status',
  'Change Tier', 'Expert: Provide Opinion', 'Analyst: Reassign User', 'Reviewer: Reassign User', 'Screener: Reassign Case',
  'Approver: Reassign Approver',
] as const;

export type ActionOptions = typeof actionOptions[number];
