import {
  BUSINESS_INFORMATION,
  BUSINESS_RELATIONSHIPS,
  CORE_FEDERAL_RELATIONSHIPS,
  EIGHTA_CHARACTER_ROUTE, EIGHTA_ECONOMIC_DISADVANTAGE_ROUTE, EIGHTA_PRIOR_INVOLVEMENT_ROUTE,
  EIGHTA_SOCIAL_DISADVANTAGE_ROUTE, EIGHTA_SPECIFIC_ROUTE,
  PROGRAM_ELIGIBILITY, WOSB_QA_ROUTE, VETCERT_QA_ROUTE,
  CONTACT_INFO_ROUTE
} from '@/app/constants/questionnaires';

export const sections = [
  {
    sectionName: 'Individual Contributor',
    questions: [
      { title: 'Program Eligibility', stepIs: 0, route: '/application/questionnaire-individual', url: PROGRAM_ELIGIBILITY },
      { title: 'Federal Relationships', stepIs: 1, route: '/application/questionnaire-individual?step=1', url: CORE_FEDERAL_RELATIONSHIPS },
      { title: 'Business Information', stepIs: 2, route: '/application/questionnaire-individual?step=2', url: BUSINESS_INFORMATION },
      { title: 'Business Relationships', stepIs: 3, route: '/application/questionnaire-individual?step=3', url: BUSINESS_RELATIONSHIPS },
      { title: 'Contact Information', stepIs: 4, route: '/application/questionnaire-individual?step=4', url: CONTACT_INFO_ROUTE }
    ]
  },
  {
    sectionName: '8(a) Business Development',
    questions: [
      { title: 'Basic Eligibility', stepIs: 0, route: '/application/questionnaire-eight-a', url: EIGHTA_SPECIFIC_ROUTE },
      { title: 'Character', stepIs: 1, route: '/application/questionnaire-eight-a?step=1', url: EIGHTA_CHARACTER_ROUTE },
      { title: 'Social Disadvantage', stepIs: 2, route: '/application/questionnaire-eight-a?step=2', url: EIGHTA_SOCIAL_DISADVANTAGE_ROUTE },
      { title: 'Prior Involvement', stepIs: 3, route: '/application/questionnaire-eight-a?step=3', url: EIGHTA_PRIOR_INVOLVEMENT_ROUTE }
    ]
  },
  {
    sectionName: 'Program Specific',
    questions: [
      { title: 'Economic Disadvantage', stepIs: 0, route: '/application/questionnaire-program-specific', url: EIGHTA_ECONOMIC_DISADVANTAGE_ROUTE },
      { title: 'Women-Owned', stepIs: 1, route: '/application/questionnaire-program-specific?step=1', url: WOSB_QA_ROUTE },
      { title: 'Veteran-Owned', stepIs: 2, route: '/application/questionnaire-program-specific?step=2', url: VETCERT_QA_ROUTE },
      { title: 'HubZone Calculator', stepIs: 3, route: '/application/questionnaire-program-specific?step=3', url: '' },
    ]
  }
];
