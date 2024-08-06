'use client'
import { Params, QuestionnaireItem } from '@/app/(evaluation)/types/types'
import { API_ROUTE, QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import { QuestionType } from '@/app/shared/form-builder/questionnaire-types/question-types'
import { Question } from '@/app/shared/types/questionnaireTypes'
import { Button } from '@trussworks/react-uswds'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import AnswerValue from './AnswerValue'
import { useApplicationData } from '../../../useApplicationData'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'

const SectionQuestions = () => {
  const params = useParams<Params>();
  const [title, setTitle] = useState<string>('');
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id);
  const firstContributorId = applicationData?.application_contributor?.[0]?.id;
  const { data, isLoading } = useSWR<Question[]>(firstContributorId ? `${API_ROUTE}/questionnaire/${firstContributorId}/${params.section_questions}` : null, fetcher);
  const { data: navItems } = useSWR<QuestionnaireItem[]>(firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null, fetcher);
  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const router = useRouter();

  function onContinue() {
    const current = navItems?.find(q => q.title === title);
    if (!current || !navItems) { setShowNextButton(false); return };
    const currIdx = navItems?.indexOf(current);
    if (currIdx === (navItems.length - 1)) {return;}
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
            <React.Fragment key={index}>
              {question.question_type === QuestionType.GRID &&
              <div key={question.id}>
                {question?.grid_questions?.map(q => <AnswerValue question={q} key={q.id} />)}
              </div>}
              <AnswerValue key={index} question={question} />
            </React.Fragment>
          ))}
        </form>
        {showNextButton && <Button onClick={onContinue} className='margin-top-4' type='button'>Accept & Continue</Button>}
      </>
      }
    </div>
  )
}

export default SectionQuestions
