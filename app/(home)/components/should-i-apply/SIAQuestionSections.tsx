'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import SIAQuestion, { Question } from './SIAQuestion'
import Styles from './ShoudIApplyForm.module.scss'
import questionData from './utils/questions.json'
import { ShouldIApplySchema } from './utils/schema'
import { exportPDF } from './utils/helpers'
const questions: Question[] = questionData as Question[];

type Inputs = z.infer<typeof ShouldIApplySchema>

const SIAQuestionSections = () => {
  const [mayNotBenefit, setMayNotBenefit] = useState('hidden');
  const [isNotEligible, setIsNotEligible] = useState('hidden');

  const {
    control, getValues, trigger
  } = useForm<Inputs>({
    resolver: zodResolver(ShouldIApplySchema),
    defaultValues: {
      revenue: undefined,
      qualityGoods: undefined,
      electronicPayments: undefined,
      coverCosts: undefined,
      usBusiness: undefined,
      financialLimits: undefined,
      financialStatements: undefined,
      usCitizen: undefined,
      disadvantagedGroup: undefined
    }
  })

  // Dynamically determine question sections
  const readinessQuestions = questions.filter(q => q.questionSection === 'readiness');
  const eligibilityQuestions = questions.filter(q => q.questionSection === 'eligibility');

  // Monitor form fields dynamically
  const readinessAnswers = useWatch({ control, name: readinessQuestions.map(q => q.name) });
  const eligibilityAnswers = useWatch({ control, name: eligibilityQuestions.map(q => q.name) });

  useEffect(() => {
    const allAnswered = readinessAnswers.every(answer => answer !== undefined);
    const anyNo = readinessAnswers.some(answer => answer === 'No');

    setMayNotBenefit(allAnswered ? (anyNo ? 'no' : 'yes') : 'hidden');
  }, [readinessAnswers]);

  useEffect(() => {
    const allAnswered = eligibilityAnswers.every(answer => answer !== undefined);
    const anyNo = eligibilityAnswers.some(answer => answer === 'No');

    setIsNotEligible(allAnswered ? (anyNo ? 'no' : 'yes') : 'hidden');
  }, [eligibilityAnswers]);

  const handleClick = () => {
    trigger([
      'revenue', 'qualityGoods', 'electronicPayments','coverCosts',
      'usBusiness', 'financialLimits', 'financialStatements', 'usCitizen', 'disadvantagedGroup'
    ]).then(
      (isValid) => {
        const userData = getValues();

        if(isValid) {
          exportPDF({
            naicsCode: '111110',
            description: 'Soybean Farming',
            awardedFY21: '$92,418.00',
            revenueResponse: userData.revenue,
            qualityGoodsResponse: userData.qualityGoods,
            electronicPaymentsResponse: userData.electronicPayments,
            coverCostsResponse: userData.coverCosts,
            usBusinessResponse: userData.usBusiness,
            financialLimitsResponse: userData.financialLimits,
            financialStatementsResponse: userData.financialStatements,
            usCitizenResponse: userData.usCitizen,
            disadvantagedGroupResponse: userData.disadvantagedGroup
          });
        }
      }
    )
  }

  return (
    <>
      <section id='sia-readiness'>
        <h2 className='margin-bottom-1 margin-top-7'>Readiness: Is your business ready to take full advantage of the 8(a) Business Development Program?</h2>
        <hr className={`${Styles.line} ${Styles.gray}`}></hr>

        {/* className={`${Styles.section_readiness}`} */}
        <Grid row gap>
          {readinessQuestions.map(question => (
            <Grid key={question.name} tablet={{ col: 6 }} mobile={{ col: 12 }}>
              <SIAQuestion key={question.name} question={question} control={control} />
            </Grid>
          ))}
        </Grid>
        {mayNotBenefit !== 'hidden' && (
          <Alert className={Styles.alert} type={mayNotBenefit === 'no' ? 'error' : 'success'} headingLevel='h3'>
            {mayNotBenefit === 'no'
              ? (
                <>
          				Based on your responses, you may benefit from waiting to apply for the 8(a) Business Development Program until you are ready to take full advantage of the 9-year program term. You can find free local assistance <a href='/'>here</a>.
                </>
              )
              : 'Based on the responses you provided above, you appear ready to apply for the 8(a) Business Development Program.'
            }
          </Alert>
        )}
      </section>

      <section id='sia_eligibility'>
        <h2 className='margin-bottom-1 margin-top-7'>Eligibility: Are you eligible for the 8(a) Business Development Program?</h2>
        <hr className={`${Styles.line} ${Styles.gray}`}></hr>

        {/* <div className={`${Styles.section_eligible}`}> */}
        <Grid row gap>
          {eligibilityQuestions.map(question => (
            <Grid key={question.name} tablet={{ col: 6 }} mobile={{ col: 12 }}>
              <SIAQuestion key={question.name} question={question} control={control} />
            </Grid>
          ))}
        </Grid>

        {isNotEligible !== 'hidden' && (
          <Alert className='width-tablet-lg maxw-full margin-bottom-3' type={isNotEligible === 'no' ? 'error' : 'success'} headingLevel='h3'>
            {isNotEligible === 'no'
              ? 'Based on your responses, you are not eligible for the 8(a) Business Development Program. Review the eligibility criteria detailed here.'
              : 'Based on the responses you provided above, you appear ready to apply for the 8(a) Business Development Program.'}
          </Alert>
        )}

        <div className='display-flex flex-row flex-justify-end'>
          <Button type='button' onClick={handleClick} outline>Export Page</Button>
          <Link className={'usa-button margin-left-205'} href={'/should-i-apply-2'}>Next</Link>
        </div>
      </section>
    </>
  )
}
export default SIAQuestionSections
