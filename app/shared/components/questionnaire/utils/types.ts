import { Question } from '@/app/services/qa-fetcher';

export interface QaInputProps {
  question: Question;
  inputId: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: string, value: any) => void;
	isSubQuestion?: boolean
}
