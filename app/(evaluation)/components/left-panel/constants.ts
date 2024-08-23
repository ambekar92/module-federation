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

export const getStaticNavItems = (application_id: string): NavItem[] => [
  {
    section: 'Business Summary',
    child: [{ section: 'Business Summary', url: `${application_id}/business-summary`, title: 'Business Summary' }]
  },
  {
    section: 'Documents',
    child: [{ section: 'Documents', url: `${application_id}/documents`, title: 'Documents' }]
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
  'Make Recommendation', 'Make an Approval', 'Complete Review', 'Escalate Review', 'Confirm Veteran Status',
  'Change Tier', 'Expert: Provide Opinion', 'Analyst: Reassign User', 'Reviewer: Reassign User', 'Screener: Reassign Case',
  'Approver: Reassign Approver',
] as const;

export type ActionOptions = typeof actionOptions[number];
