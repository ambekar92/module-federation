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
