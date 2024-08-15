import React, { Dispatch, RefObject, useEffect, useState } from 'react'
import { ApprovalLetterType, CompleteReviewFormType, Steps } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { approvalLetterSchema } from '../schema'
import { Button, ButtonGroup, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import Checkbox from '@/app/shared/form-builder/form-controls/Checkbox'
import { Application } from '@/app/services/types/application-service/Application'

const containerStyles: React.CSSProperties = {padding: '0rem 1rem', minHeight: '20vh', maxHeight: '60vh', overflowY: 'auto', border: '1px solid black'}

const ApprovalLetter = ({ modalRef, setCurrentStep, applicationData }: {
	modalRef: RefObject<ModalRef>, setCurrentStep: Dispatch<React.SetStateAction<number>>,
	applicationData: Application | null
}) => {
  const [currentLetterIdx, setCurrentLetterIdx] = useState<number | null>(null);
  const [supplementalLetters, setSupplementalLetters] = useState<string[]>([]);
  const {getValues, setValue, reset} = useFormContext<CompleteReviewFormType>()

  const methods = useForm<ApprovalLetterType>({
    resolver: zodResolver(approvalLetterSchema),
    defaultValues: getValues('approvalLetter'),
    shouldUnregister: true
  })

  useEffect(() => {
    setSupplementalLetters(['Supplemental Letter 1']);
  } , [])

  function onContinue() {
    if (currentLetterIdx === null && supplementalLetters.length > 0) {
      setCurrentLetterIdx(0);
      return;
    } else if (currentLetterIdx !== null && currentLetterIdx <= supplementalLetters.length) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx! + 1);
    }
    if (currentLetterIdx === supplementalLetters.length) {
      setCurrentStep(Steps.DeclineLetter);
    }
  }

  function onPrevious() {
    if (currentLetterIdx === null || !supplementalLetters.length) {
      setCurrentStep(Steps.ReviewSummary);
    } else if (currentLetterIdx > 0) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx! - 1);
    } else if (currentLetterIdx === 0) {
      setCurrentLetterIdx(null);
    }
  }

  function onCancel() {
    setCurrentStep(1);
    reset();
    modalRef.current?.toggleModal();
  }

  // formats date as MM/DD/YYYY
  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  }

  // formats date as MM/YYYY
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
  }

  const today = new Date();
  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

  function getContinueButtonTxt() {
    if (!supplementalLetters.length) {
      return 'Continue';
    }
    if (currentLetterIdx === null && supplementalLetters.length > 0) {
      return `Continue & View ${supplementalLetters.length} Supplemental Letters`;
    }
    if (currentLetterIdx! < supplementalLetters.length - 1) {
      return 'Continue';
    }
    if (currentLetterIdx === supplementalLetters.length - 1) {
      return 'Preview PDF';
    }
    if (currentLetterIdx === supplementalLetters.length) {
      return 'Sign and Continue';
    }
  }

  function onSubmit(data: ApprovalLetterType) {
    setValue('approvalLetter', data);
    setCurrentStep(Steps.DeclineLetter);

  }

  if(!applicationData) {
    return <h3>No application data found...</h3>
  }

  const defaultText = (
    <>
      <p>{formatFullDate(today)}</p>

      <p>
        {applicationData.application_contributor[0].user.first_name} {applicationData.application_contributor[0].user.last_name} (Qualifying Owner)<br /><br/>
        {applicationData.sam_entity.legal_business_name}<br />
        {applicationData.sam_entity.physical_addr_1} {applicationData.sam_entity.physical_addr_2 ?? applicationData.sam_entity.physical_addr_2}<br/>
        {applicationData.sam_entity.physical_city}, {applicationData.sam_entity.physical_state_or_province} {applicationData.sam_entity.physical_zip_code_5}<br/>
      </p>

      <p>Dear {applicationData.application_contributor[0].user.first_name} {applicationData.application_contributor[0].user.last_name},</p>

      <p>
          Congratulations! I am pleased to inform you that {applicationData.sam_entity.legal_business_name} has been approved for the following U.S. Small Business Administration (SBA) certification(s):
      </p>

      <ul>
        <li>[8(a) Business Development (8(a) BD) Program]</li>
        <li>[HUBZone Program]</li>
        <li>[Women-Owned Small Business (WOSB)]</li>
        <li>[Economically Disadvantaged Women-Owned Small Business (EDWOSB)]</li>
        <li>[Veteran-Owned Small Business (VOSB)]</li>
        <li>[Service-Disabled Veteran-Owned Small Business (SDVOSB)]</li>
      </ul>

      <p>
        {applicationData.sam_entity.legal_business_name} is eligible for [8(a)/HUBZone/WOSB/EDWOSB/VOSB/SDVOSB] contracts and will be identified as a certified [8(a)/HUBZone/WOSB/EDWOSB/VOSB/SDVOSB] program participant in [Public search name] as of the date of this letter, {formatFullDate(today)}.
      </p>

      <p>
          To align with your existing [8(a)/HUBZone/WOSB/EDWOSB/VOSB/SDVOSB] certification, your effective date for re-certification for all your SBA certifications is {formatMonthYear(today)}. Your first certification renewal will be due {formatMonthYear(oneYearFromToday)}.
      </p>

      <h3>Responsibilities</h3>

      <p>
          The information below sets forth requirements related to your business&quot; continued eligibility and its responsibilities as a certified program participant:
      </p>

      <h4>Reporting Changes:</h4>
      <p>
          You are required to notify SBA in writing of changes to your business that could affect its eligibility. Please refer to the attached supplemental pages for more details and examples.
      </p>

      <h4>System for Award Management (SAM.gov):</h4>
      <p>
          You must keep the business&quot; SAM.gov profile and DSBS records up-to-date in order for the business to receive benefits from our Programs (i.e., to be identified by contracting officers as eligible to be awarded small business set-aside contracts and to be paid under any such contracts). You must validate your business&quot; SAM.gov information at least annually or your SAM.gov registration will become inactive. If you need assistance in updating the business&quot; SAM.gov or DSBS information, please go to the SAM.gov Help Desk at https://fsd.gov/fsd-gov/home.do.
      </p>

      <h4>Notices from SBA:</h4>
      <p>
          You are responsible for responding to notices from SBA, including but not limited to notices regarding certification renewals, eligibility reviews, protests, proposed decertification and termination actions, and re-certification requirements. All SBA Programs send such notices to the business&quot; email address listed in its MySBA Profile. If the business fails to respond to these notices, SBA will propose the business for decertification or termination and may subsequently de-certify or terminate it from participation in SBA Programs. Therefore, it is critical that you keep the business&quot; SAM.gov and MySBA profiles current, including listing an active email address for contacting the business, and check your email&quot;s SPAM folder to make sure that you are receiving emails from SBA.
      </p>

      <h4>Contracting Requirements:</h4>
      <p>
          You are required to comply with limitations on subcontracting requirements and non-manufacturer rule when performing any small business set-aside contracts (see 13 CFR 125.6)
      </p>

      <h3>Resources and More Information</h3>

      <p>
          As a certified [8(a)/HUBZone/WOSB/EDWOSB/VOSB/SDVOSB] program participant, there are valuable free resources available to you, including:
      </p>

      <h4>SBA Resource Partners:</h4>
      <p>
          For general assistance on various topics, information on SBA programs, and upcoming small business events in your area. You can find your local resource partner by visiting: https://www.sba.gov/tools/local-assistance.
      </p>

      <h4>Contract Opportunities:</h4>
      <p>
          The &quot;Contract Opportunities&quot; function in SAM.gov (https://sam.gov/content/opportunities) serves as a central listing for Federal procurement opportunities. Anyone interested in doing business with the government can use this system to search opportunities. In addition, the &quot;Contract Data&quot; function in SAM.gov (https://sam.gov/content/contract-data) is a database of federal contracts.
      </p>
    </>
  )
  const content = currentLetterIdx === null ?
    <div style={containerStyles}>
      {defaultText}
    </div> :
    supplementalLetters.length > 0 && currentLetterIdx !== null && currentLetterIdx < supplementalLetters.length
      ? <div style={containerStyles}>{supplementalLetters[currentLetterIdx]}</div>
      : <><div style={containerStyles}>{defaultText}</div>
        <h5>Signature</h5>
        <Checkbox<ApprovalLetterType>
          name='decision'
          label={'By clicking this checkbox, you are attesting that you\'ve done a thorough review and are ready to officially approve or deny the certifications listed in this application. Once you select "Sign and Submit", the applicant will be notified and receive their official letters.'}/>
      </>;

  return (
    <FormProvider {...methods}>
      <h4>Approval Letter(s)</h4>
      {currentLetterIdx !== null && currentLetterIdx >= 0 && currentLetterIdx < supplementalLetters.length && <p>Supplemental Letter {currentLetterIdx+1}</p>}
      {content}

      <ModalFooter style={{ marginTop: '3rem' }}>
        <ButtonGroup style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', gap: '1rem'}}>
            <Button
              type="button"
              onClick={onPrevious}
              outline
            >
              Previous
            </Button>
            {currentLetterIdx !== supplementalLetters.length && <Button
              type="button"
              onClick={onContinue}
            >
              {getContinueButtonTxt()}
            </Button>}
            {currentLetterIdx === supplementalLetters.length && <Button
              type="submit"
              onClick={methods.handleSubmit(onSubmit)}
            >
              Sign and Continue
            </Button>}

          </div>
          <Button
            type="button"
            onClick={onCancel}
            outline
          >
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </FormProvider>
  )
}

export default ApprovalLetter
