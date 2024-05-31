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
      { title: 'Federal Relationships', stepIs: 0, route: '/additional-information/individual', url: CORE_FEDERAL_RELATIONSHIPS },
      { title: 'Program Eligibility', stepIs: 1, route: '/additional-information/individual?step=1', url: PROGRAM_ELIGIBILITY },
      { title: 'Business Information', stepIs: 2, route: '/additional-information/individual?step=2', url: BUSINESS_INFORMATION },
      { title: 'Business Relationships', stepIs: 3, route: '/additional-information/individual?step=3', url: BUSINESS_RELATIONSHIPS }
    ]
  },
  {
    sectionName: '8(a) Business Development',
    questions: [
      { title: '8(a) Specific', stepIs: 0, route: '/additional-information/eighta', url: EIGHTA_SPECIFIC_ROUTE },
      { title: '8(a) Character', stepIs: 1, route: '/additional-information/eighta?step=1', url: EIGHTA_CHARACTER_ROUTE },
      { title: '8(a) Social Disadvantage', stepIs: 2, route: '/additional-information/eighta?step=2', url: EIGHTA_SOCIAL_DISADVANTAGE_ROUTE },
      { title: '8(a) Economic Disadvantage', stepIs: 3, route: '/additional-information/eighta?step=3', url: EIGHTA_ECONOMIC_DISADVANTAGE_ROUTE },
      { title: '8(a) Prior Involvement', stepIs: 4, route: '/additional-information/eighta?step=4', url: EIGHTA_PRIOR_INVOLVEMENT_ROUTE }
    ]
  },
  {
    sectionName: 'Review and Sign',
    questions: [
      { title: 'By checking the box, you agree to the statement', stepIs: null, route: '/additional-information/attestation', url: '/' }
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
