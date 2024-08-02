import { AnswerChoice, UrlAnswerChoice } from '../types/questionnaireTypes';

export function isUrlAnswerChoice(answerChoice: AnswerChoice): answerChoice is UrlAnswerChoice {
  return answerChoice !== null && 'url' in answerChoice;
}
