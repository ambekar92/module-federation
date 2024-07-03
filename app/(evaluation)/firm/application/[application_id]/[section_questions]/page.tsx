'use client'
import { MainQuestionObject } from '@/app/shared/form-builder/questionnaire-types/question'
import { QuestionType } from '@/app/shared/form-builder/questionnaire-types/question-types'
import { Params, QuestionnaireItem } from '@/app/(evaluation)/types/types'
import { API_ROUTE, QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'
import { Button } from '@trussworks/react-uswds'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'
import AnswerValue from './AnswerValue'

const SectionQuestions = () => {
  const methods = useForm();
  const params = useParams<Params>();
  const [title, setTitle] = useState<string>('');
  const { data, isLoading } = useSWR<MainQuestionObject[]>(`${API_ROUTE}/questionnaire/${params.application_id}/${params.section_questions}`, fetcherGET);
  const { data: navItems } = useSWR<QuestionnaireItem[]>(`${QUESTIONNAIRE_LIST_ROUTE}/${params.application_id}`, fetcherGET);
  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const router = useRouter();

  console.log('data *** ', data)

  function onContinue() {
    const current = navItems?.find(q => q.title === title);
    if (!current || !navItems) { setShowNextButton(false); return };
    const currIdx = navItems?.indexOf(current);
    if (currIdx === (navItems.length - 1)) return;
    const next = navItems[currIdx + 1].url;
    router.push(`../${next}`);
  }

  useEffect(() => {
    if (navItems && data) {
      const currentSection = navItems.find(item => item.url.includes(params.section_questions));
      if (currentSection) {
        setTitle(currentSection.title);
      }
    }
  }, [navItems, data]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>No data found</div>}
      {!!data && !isLoading && <>
        <h1>{title}</h1>

        <form >
          {data.map((question, index) => (
            <>
            {question.question_type === QuestionType.GRID &&
              <div key={question.id}>
                {question?.grid_questions?.map(q => <AnswerValue question={q} key={q.id} />)}
              </div>}
              <AnswerValue key={index} question={question} />
              </>
          ))}
        </form>
        {showNextButton && <Button onClick={onContinue} className='margin-top-4' type='button'>Accept & Continue</Button>}
      </>
      }
    </div>
  )
}

export default SectionQuestions