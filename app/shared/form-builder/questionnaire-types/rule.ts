import { QuestionAnswer } from './question';

type AnswerGivenValue = {
    boolean: 'TRUE' | 'FALSE';
  };

export type Rule = {

alert_message: string;
answer_given_value: AnswerGivenValue;

document_requirement: string;
next_question_id: number;

question_id: number;
sub_question: QuestionAnswer

}
