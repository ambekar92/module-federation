import { axiosInstance } from '@/app/services/fetcher';

type SelectOption = {
  option: string;
  description: string | null;
};

type AnswerChoice = {
  options: SelectOption[];
} | null;

export type DocumentUploadType = {
  id: number;
  profile_answer_flag: boolean;
  name: string;
  description: string;
  title: string;
  pii_flag: boolean;
  answer_choice: AnswerChoice;
  answer_required_flag: boolean;
  document_required_flag: boolean;
  question_ordinal: number | null;
  question_type: number;
  program: number | null;
  application_section: number;
};

type ApiResponse = DocumentUploadType[];

export const fetchDocumentUploadQuestions = async (url: string): Promise<DocumentUploadType[]> => {
  const response = await axiosInstance.get<ApiResponse>(url);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error('API call unsuccessful');
  }
};
