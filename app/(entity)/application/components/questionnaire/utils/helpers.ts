import {
  BUSINESS_INFORMATION,
  BUSINESS_RELATIONSHIPS,
  CORE_FEDERAL_RELATIONSHIPS,
  EIGHTA_CHARACTER_ROUTE, EIGHTA_ECONOMIC_DISADVANTAGE_ROUTE, EIGHTA_PRIOR_INVOLVEMENT_ROUTE,
  EIGHTA_SOCIAL_DISADVANTAGE_ROUTE, EIGHTA_SPECIFIC_ROUTE,
  PROGRAM_ELIGIBILITY
} from '@/app/constants/questionnaires';
import { QaQuestionsType } from '@/app/services/qa-fetcher';

export const sections = [
  {
    sectionName: 'Individual',
    questions: [
      { title: 'Federal Relationships', stepIs: 0, route: '/application/questionnaire-individual', url: CORE_FEDERAL_RELATIONSHIPS },
      { title: 'Program Eligibility', stepIs: 1, route: '/application/questionnaire-individual?step=1', url: PROGRAM_ELIGIBILITY },
      { title: 'Business Information', stepIs: 2, route: '/application/questionnaire-individual?step=2', url: BUSINESS_INFORMATION },
      { title: 'Business Relationships', stepIs: 3, route: '/application/questionnaire-individual?step=3', url: BUSINESS_RELATIONSHIPS },
      { title: 'Economic Disadvantages', stepIs: 4, route: '/application/questionnaire-individual?step=4', url: EIGHTA_ECONOMIC_DISADVANTAGE_ROUTE }
    ]
  },
  {
    sectionName: '8(a) Business Development',
    questions: [
      { title: 'Basic Eligibility', stepIs: 0, route: '/application/questionnaire-eight-a', url: EIGHTA_SPECIFIC_ROUTE },
      { title: 'Character', stepIs: 1, route: '/application/questionnaire-eight-a?step=1', url: EIGHTA_CHARACTER_ROUTE },
      { title: 'Social Disadvantages', stepIs: 2, route: '/application/questionnaire-eight-a?step=2', url: EIGHTA_SOCIAL_DISADVANTAGE_ROUTE },
      { title: 'Prior Involvement', stepIs: 3, route: '/application/questionnaire-eight-a?step=3', url: EIGHTA_PRIOR_INVOLVEMENT_ROUTE }
    ]
  }
];

// Combines all endpoints into one object
export const combineApiData = (data: QaQuestionsType[]): QaQuestionsType => {
  const combinedData: QaQuestionsType = {
    names: [],
    questions: {},
    answers: {}
  };

  data.forEach(item => {
    combinedData.names.push(...item.names);
    Object.assign(combinedData.questions, item.questions);
    Object.assign(combinedData.answers, item.answers);
  });

  return combinedData;
};
