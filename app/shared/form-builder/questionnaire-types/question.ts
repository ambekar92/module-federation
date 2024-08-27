import { Answer, AnswerChoice } from './answer';
import { Rule } from './rule';

export type QuestionAnswer = {
    id: number;
    name: string;
    profile_answer_flag: boolean;
    description: string;
    title: string;
    question_type: string;
    pii_flag: boolean;
    answer_choice: AnswerChoice | null;
    answer_required_flag: boolean;
    document_required_flag: boolean;
    question_ordinal: number | null;
    answer: Answer;
    rules: Rule[];
  };

export type MainQuestionObject = QuestionAnswer &  {
    grid_questions?: QuestionAnswer[];
  };
