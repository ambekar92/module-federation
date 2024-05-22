import { axiosInstance } from './fetcher';

// Updated to include 'select' type
type QuestionTypeName = 'boolean' | 'text' | 'grid' | 'document_upload' | 'number' | 'select' | string;

type GridAnswerChoice = {
  max_rows: number | null;
  min_rows: number | null;
  grid_question_names: string[];
};

type SelectAnswerChoice = {
  options: {
    option: string;
    description: string | null;
  }[];
};

type AnswerChoice = GridAnswerChoice | SelectAnswerChoice | null;

type Rule = {
  question_id: number;
  answer_given_value: { boolean: 'TRUE' | 'FALSE' };
  next_question_id: number | null;
  alert_message: string;
  document_requirement: any | null;
};

// From the API *subject to change*
type Question = {
  question__id: number;
  question__profile_answer_flag: boolean;
  question__name: string;
  question__description: string;
  question__title: string;
  question__question_type__name: QuestionTypeName;
  question__pii_flag: boolean;
  question__answer_choice: AnswerChoice;
  question__answer_required_flag: boolean;
  question__document_required_flag: boolean;
  question__question_ordinal: number | null;
  question__program: number;
  question__application_section: number;
  rules?: Rule[];
};

type Questions = {
  [questionKey: string]: Question;
};

// Will need to be changed to match Answer part of API if it changes
type AnswerValue = {
  answer: string | number | boolean | null;
};

type Answer = {
  id: number;
  profile_answer_flag: boolean;
  reminder_flag: boolean;
  application_contributor_id: number;
  value: AnswerValue;
  question_id: number;
  answer_by: number | null;
};

type Answers = {
  [answerId: string]: Answer;
};

export type QaQuestionsType = {
  names: string[];
  questions: Questions;
  answers: Answers;
};

export const qaFetcherGET = async (url: string): Promise<QaQuestionsType> => {
  const response = await axiosInstance.get<QaQuestionsType>(url);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error('API call unsuccessful');
  }
};
