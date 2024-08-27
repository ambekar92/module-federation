interface BaseQuestion {
  label: string;
  input: {
    name: string;
    type: string;
  };
  details?: string;
}

export interface SelectQuestion extends BaseQuestion {
  input: {
    name: string;
    type: 'select';
  };
  options: string[];
}

export type QuestionType = BaseQuestion | SelectQuestion;

export interface MultiStepQuestionsProps {
  step?: number;
}

type QuestionTypeName = 'text' | 'read_only' | 'textarea' | 'text_area' | 'number' | 'boolean' | 'select' | 'multi_select' | 'grid' | 'date' | 'text_with_asterisks' | 'address' | 'document_upload' | 'api.get.url' | string;

export type GridAnswerChoice = {
  max_rows: number | null;
  min_rows: number | null;
  grid_question_names: string[];
};

export type SelectAnswerChoice = {
  options: {
    option: string;
    description: string | null;
  }[];
};

export type UrlAnswerChoice = {
  url: string;
};

export type AnswerChoice = GridAnswerChoice | SelectAnswerChoice | UrlAnswerChoice | null;

export type AnswerGivenValue = {
  boolean?: 'TRUE' | 'FALSE' | null;
  multi_select?: string | null;
  select?: string[] | null;
  text?: string | null;
  number?: number | null;
  date?: string | null;
  address?: string | null;
  grid?: any | null; // You might want to define a more specific type for grid
  'api.get.url'?: string | null;
  'document_upload'?: string | null;
};

export type Rule = {
  question_id: number;
  answer_given_value: AnswerGivenValue;
  next_question_id: number | null;
  alert_message: string | null;
  document_requirement: any | null;
  sub_question?: Question;
};

export type Question = {
  id: number;
  name: string;
  profile_answer_flag: boolean;
  description: string;
  title: string;
  question_type: QuestionTypeName;
  pii_flag: boolean;
  answer_choice: AnswerChoice;
  answer_required_flag: boolean;
  document_required_flag: boolean;
  question_ordinal: number | null;
  answer: Answer;
  rules: Rule[];
  grid_questions?: Question[];
};

export type Answer = {
  id: number;
  profile_answer_flag: boolean;
  reminder_flag: boolean;
  application_contributor_id: number;
  value: {answer: string | number | boolean | string[] | null};
  question_id: number;
  answer_by: number | null;
};

export type QaQuestionsType = Question[];
