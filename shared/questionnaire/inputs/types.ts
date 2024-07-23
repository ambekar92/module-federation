import { Question } from '@/app/shared/types/questionnaireTypes';

export interface QaInputProps {
  question: Question;
  inputId: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (question: Question, value: any) => void;
  isSubQuestion?: boolean;
	selectedAnswers: { [key: string]: any };
	isGridQuestion?: boolean;
}
