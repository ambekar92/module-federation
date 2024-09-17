import Questions from '@/app/(entity)/application/qa-helpers/Questions';
import { Answer, Question } from '@/app/shared/types/questionnaireTypes';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Spinner from '../../components/spinner/Spinner';
import { isUrlAnswerChoice } from '../questionnaireHelpers';
import axios from 'axios';

interface ApiGetUrlInputProps {
  question: Question;
  inputId: string;
  handleChange: (question: Question, value: any) => void;
  selectedAnswers: Record<string, Answer>;
  isSubQuestion: boolean;
  contributorId: number;
	onRefetchQuestionnaires: () => void;
}

const ApiGetUrlInput: React.FC<ApiGetUrlInputProps> = ({
  question,
  handleChange,
  contributorId,
  onRefetchQuestionnaires
}) => {
  const [shouldRenderQuestions, setShouldRenderQuestions] = useState(false);
  const [questionsUrl, setQuestionsUrl] = useState('');

  const url = question.answer_choice && isUrlAnswerChoice(question.answer_choice)
    ? question.answer_choice.url
    : null;

  const { data, error } = useSWR(url, () => url && axios.get(url).then(res => res.data));

  useEffect(() => {
    if (data === '/questionnaire-list/<application_contributor_id>') {
      window.location.href = `/application/questionnaire/${contributorId}`;
    } else if (data) {
      let newUrl = data;
      if (newUrl.includes('<application_contributor_id>')) {
        newUrl = newUrl.replace('<application_contributor_id>', contributorId.toString());
      }
      setQuestionsUrl(newUrl);
      setShouldRenderQuestions(true);
      handleChange(question, data);
    }
  }, [data, question, handleChange, contributorId]);

  if (error) {return <div>Failed to load</div>;}
  if (!data) {return <Spinner center />}

  if (shouldRenderQuestions) {
    return <Questions setCanNavigate={() => {}} url={questionsUrl} title={''} contributorId={contributorId} onRefetchQuestionnaires={onRefetchQuestionnaires} />;
  }

  return null;
};

export default ApiGetUrlInput;
