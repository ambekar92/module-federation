'use client'
import QuestionRenderer from '@/app/(entity)/application/qa-helpers/QuestionRenderer'
import { Params } from '@/app/(evaluation)/types/types'
import { ANSWER_ROUTE, API_ROUTE, QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes'
import { fetcherGET, fetcherPOST } from '@/app/services/fetcher-legacy'
import { Answer, QaQuestionsType, Question } from '@/app/shared/types/questionnaireTypes'
import { Button, ButtonGroup } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

interface QuestionnaireItem {
  url: string;
  title: string;
}

const BusinessPlanPage = () => {
  const params = useParams<Params>();
  const [title, setTitle] = useState<string>('');
  const { data, isLoading } = useSWR<QaQuestionsType>(`${API_ROUTE}/questionnaire/${params.application_id}/${params.section_questions}`, fetcherGET);
  const { data: navItems } = useSWR<QuestionnaireItem[]>(`${QUESTIONNAIRE_LIST_ROUTE}/${params.application_id}`, fetcherGET);
  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const [showPreviousButton, setShowPreviousButton] = useState<boolean>(true);
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer>>({});
  const userId = null;
  const contributorId = parseInt(params.application_id as string, 10);

  const handleAnswerChange = (question: Question, value: any) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [question.name]: {
        id: question.id,
        profile_answer_flag: question.profile_answer_flag,
        reminder_flag: false,
        application_contributor_id: contributorId,
        value: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value,
        question_id: question.id,
        answer_by: userId,
      }
    }));

    // Save the answer immediately
    const answer = {
      profile_answer_flag: question.profile_answer_flag,
      application_contributor_id: contributorId,
      value: {
        answer: question.question_type === 'multi_select'
          ? value.map((option: { value: string }) => option.value)
          : value
      },
      question_id: question.id,
      answer_by: userId,
      reminder_flag: false
    };

    fetcherPOST(ANSWER_ROUTE, [answer])
      .catch(error => {
        console.error('Error saving answer:', error);
      });
  };

  function onContinue() {
    const current = navItems?.find(q => q.title === title);
    if (!current || !navItems) { setShowNextButton(false); return; }
    const currIdx = navItems?.indexOf(current);
    if (currIdx === (navItems.length - 1)) { return; }
    const next = navItems[currIdx + 1].url;
    router.push(`../${next}`);
  }

  function onPrevious() {
    const current = navItems?.find(q => q.title === title);
    if (!current || !navItems) { setShowPreviousButton(false); return; }
    const currIdx = navItems?.indexOf(current);
    if (currIdx === (navItems.length + 1)) { return; }
    const next = navItems[currIdx - 1].url;
    router.push(`../${next}`);
  }

  useEffect(() => {
    if (navItems && data) {
      const currentSection = navItems.find(item => item.url.includes(params.section_questions));
      if (currentSection) {
        setTitle(currentSection.title);
      }
      const current = navItems?.find(item => item.url.includes(params.section_questions));
      const currIdx = navItems?.indexOf(current);
      currIdx === 0 ? setShowPreviousButton(false) : setShowPreviousButton(true)
    }
  }, [navItems, data, params.section_questions]);

  return (
    <div className='display-flex flex-column height-full'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>No data found</div>}
      {!!data && !isLoading && <>
        <h1>{title}</h1>

        {data.map((question, index) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            index={index}
            selectedAnswers={selectedAnswers}
            handleAnswerChange={handleAnswerChange}
            userId={userId}
            contributorId={contributorId}
          />
        ))}
        <div className='flex-1'>{ }</div>

        <ButtonGroup className='display-flex flex-justify'>
          <div className='flex-align flex-justify display-flex'>
            {showPreviousButton && <Button onClick={onPrevious} className='margin-top-4 flex-justify' type='button'>Previous</Button>}
          </div>

          <div className='flex-align-end flex-justify-end display-flex'>
            {showNextButton && <Button onClick={onContinue} className='margin-top-4 flex-justify-end' type='button'>Next</Button>}
          </div>
        </ButtonGroup>

      </>
      }
    </div>
  )
}

export default BusinessPlanPage
