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

interface QuestionnaireList {
	section: string,
	title: string,
	url: string,
	status: string,
}

interface QuestionnaireListError {
	status_code?: number,
	detail?: string
}

export type QuestionnaireListType = QuestionnaireList[]
