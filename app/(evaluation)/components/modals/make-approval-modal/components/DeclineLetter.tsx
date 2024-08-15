import { Application } from '@/app/services/types/application-service/Application'
import Checkbox from '@/app/shared/form-builder/form-controls/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ModalFooter, ModalRef, Textarea } from '@trussworks/react-uswds'
import React, { Dispatch, RefObject, useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { generateDefaultText } from '../constants'
import { declineLetterSchema } from '../schema'
import { MakeApprovalFormType, DeclineLetterType, Steps } from '../types'

const containerStyles: React.CSSProperties = {padding: '0rem 1rem', minHeight: '20vh', maxHeight: '60vh', overflowY: 'auto', border: '1px solid black'}

const DeclineLetter = ({ modalRef, setCurrentStep, applicationData }: {
  modalRef: RefObject<ModalRef>,
  setCurrentStep: Dispatch<React.SetStateAction<number>>,
  applicationData: Application | null
}) => {
  const [currentLetterIdx, setCurrentLetterIdx] = useState<number | null>(null);
  const [supplementalLetters, setSupplementalLetters] = useState<string[]>([]);
  const {getValues, setValue, reset} = useFormContext<MakeApprovalFormType>();

  const methods = useForm<DeclineLetterType>({
    resolver: zodResolver(declineLetterSchema),
    defaultValues: getValues('declineLetter'),
    shouldUnregister: true
  })

  useEffect(() => {
    setSupplementalLetters(['Supplemental Letter 1']);
  }, [])

  useEffect(() => {
    const declineLetter = getValues('declineLetter')
    methods.reset(declineLetter)
  }, [])

  if(!applicationData) {
    return <h3>No application data found...</h3>
  }

  const today = new Date();
  const { asJSX: defaultText, asString: defaultTextString } = generateDefaultText(applicationData, today);

  function onContinue() {
    if (currentLetterIdx === null && supplementalLetters.length > 0) {
      setCurrentLetterIdx(0);
      return;
    } else if (currentLetterIdx !== null && currentLetterIdx <= supplementalLetters.length) {
      setCurrentLetterIdx(currentLetterIdx => currentLetterIdx! + 1);
    }
    if (currentLetterIdx === supplementalLetters.length) {
      setCurrentStep(3);
    }
  }

  function onPrevious() {
    if (currentLetterIdx === null || !supplementalLetters.length) {
      setCurrentStep(Steps.ApprovalLetter);
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

  function onSubmit(formData: DeclineLetterType) {
    setValue('declineLetter', formData)
    const completeReviewFormData = getValues();
    console.log(completeReviewFormData);
    setCurrentStep(1);
    reset();
    modalRef.current?.toggleModal()
  }

  function getContinueButtonTxt() {
    if (!supplementalLetters.length || currentLetterIdx === supplementalLetters.length) {
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
  }

  const content = currentLetterIdx === null ?
    <div style={containerStyles}>
      {defaultText}
    </div> :
    supplementalLetters.length > 0 && currentLetterIdx !== null && currentLetterIdx < supplementalLetters.length
      ? <div style={containerStyles}>{supplementalLetters[currentLetterIdx]}</div>
      : <><div style={containerStyles}>
        <Textarea
          style={{ maxWidth: '100%', width: '100%', resize: 'vertical'}}
          className='border-0'
          id='letterContent'
          name='letterContent'
          defaultValue={defaultTextString}
        />
      </div>
      <h5>Signature</h5>
      <Checkbox<DeclineLetterType>
        {...methods.register('approvalDecision')}
        label={'By clicking this checkbox, you are attesting that you\'ve done a thorough review and are ready to officially approve or deny the certifications listed in this application. Once you select "Sign and Submit", the applicant will be notified and receive their official letters.'}/>
      </>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h4>Decline Letter(s)</h4>
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
              >
                Sign and Submit
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
      </form>
    </FormProvider>
  )
}

export default DeclineLetter
