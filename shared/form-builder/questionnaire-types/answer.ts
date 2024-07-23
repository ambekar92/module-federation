export type Answer = {
    profile_answer_flag: boolean;
    reminder_flag: boolean;
    application_contributor: number;
    value: string | null;
    question_id: number;
    answer_by: string | null;
  };

  export type AnswerChoice = {
    max_rows: number | null;
    min_rows: number | null;
    grid_question_names: string[];
    options?: AnswerChoiceOption[];
  };

  export type AnswerChoiceOption = {
    option: string;
    description: string | null;
  };