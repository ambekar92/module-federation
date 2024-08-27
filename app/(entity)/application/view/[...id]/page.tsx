'use client'
import { useGetQuestionnaireList } from '@/app/services/queries/application-service/useGetQuestionnaireList';
import { useGetResponses } from '@/app/services/queries/application-service/useGetResponses';
import { QuestionAnswer } from '@/app/shared/form-builder/questionnaire-types/question';
import { useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect } from 'react';

const Responses = () => {
  const [currentSection, setCurrentSection] = React.useState('');
  const search = useSearchParams();
  const sectionUrl = search.get('sectionUrl');
  const contributorId = sectionUrl?.split('/')[0];
  const { data: responses, isLoading: isLoadingResponses } = useGetResponses(sectionUrl as string);
  const { data: sections } = useGetQuestionnaireList(Number(contributorId));

  useEffect(() => {
    if (!sections || !sections.length) {return;}
    const currSection = sections.find(section => section.url === sectionUrl);
    setCurrentSection(currSection?.title || '');
  }, [sections, search.get('sectionUrl')]);
  if (isLoadingResponses) {return <div>Loading...</div>;}
  return (
    <div>
      <h2>{currentSection}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {responses && responses.length > 0 && responses.map((response: QuestionAnswer) => (
          <div key={response.id}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0' }}>{response.title}</h3>
              <span>{response.title.toLowerCase() !== response.description.toLowerCase() && response.description}</span>
              <br />
              {getResponses(response)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getResponses(response: QuestionAnswer): ReactElement {
  if (!response?.answer?.value?.answer) {
    return <div ><strong>Provided response:</strong>{' '}No response provided</div>
  }
  if (!Array.isArray(response.answer.value.answer)) {
    return <div><strong>Provided response:</strong>{' '}{response.answer.value.answer}</div>
  }
  if (Array.isArray(response.answer.value.answer) &&
    response.answer.value.answer.every(el => typeof el === 'string' || typeof el === 'number' || typeof el === 'boolean')) {
    return <div><strong>Provided response:</strong>{' '}{response.answer.value.answer.join(', ')}</div>
  }
  if (Array.isArray(response?.answer?.value?.answer) && response.answer.value.answer.some(el => el.constructor === Object)) {
    <div ><strong>Provided response(s):</strong>{' '}{
      response.answer.value.answer.map((ansObj: Record<string, any>, index: number) => (
        <div key={index}>
          {Object.keys(ansObj).map(key => <div key={Math.random()}>
            {key}:{' '}{Array.isArray(ansObj[key]) ? ansObj[key].join(', ') : ansObj[key]}
          </div>)}
        </div>
      ))
    }
    </div>
  }
  return <></>

}

export default Responses;
