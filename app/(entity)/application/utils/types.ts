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

export interface QuestionnaireProps {
  applicationId: number;
  contributorId: number | string;
}
