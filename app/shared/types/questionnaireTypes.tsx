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

type QuestionTypeName = 'boolean' | 'text' | 'grid' | 'document_upload' | 'number' | 'select' | 'multi_select' | string;

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

export type Rule = {
  question_id: number;
  answer_given_value: {
    boolean?: 'TRUE' | 'FALSE';
    multi_select?: string;
    select?: string[];
    text?: string;
    number?: number;
  };
  next_question_id: number | null;
  alert_message: string | null;
  document_requirement: any | null;
  sub_question?: Question;
};

// From the API *subject to change again lol* -KJ
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
  answer: Answer | null;
  rules: Rule[];
  grid_questions?: Question[];
};

export type Answer = {
  id: number;
  profile_answer_flag: boolean;
  reminder_flag: boolean;
  application_contributor_id: number;
  value: string | number | boolean | string[] | null;
  question_id: number;
  answer_by: number | null;
};

export type QaQuestionsType = Question[];
