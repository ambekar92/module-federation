export type ValidDocument = {
    document_type_id: number;
    name: string;
    description: string;
    question_id: number;
  };

export type DocumentRequiredQuestions = {
    id: number;
    name: string;
    profile_answer_flag: boolean;
    description: string;
    title: string;
    question_type: string;
    pii_flag: boolean;
    answer_choice: any | null;
    answer_required_flag: boolean;
    document_required_flag: boolean;
    question_ordinal: number;
    application_section: string;
    answer: any | null;
    valid_documents: ValidDocument[];
  };
