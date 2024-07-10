'use client'
import CustomHeader from '@/app/shared/components/forms/CustomHeader';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { Button, ButtonGroup, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import QuestionContent from '../components/questionnaire/QuestionContent';
import AttestationJSON from '../utils/form-data.json';
import { useApplicationDispatch } from '../redux/hooks';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { applicationSteps, qaAppLinkPrefix } from '../utils/constants';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { fetcherPUT } from '@/app/services/fetcher';
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';

function SignPage() {
  const { contributorId, applicationId, userId } = useApplicationId();
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Sign Application');

  useEffect(() => {
    dispatch(setStep(applicationSteps.sign.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  const handleModalToggle = () => {
    if(formSubmitted) {
      setFormSubmitted(false);
    }
    modalRef.current?.toggleModal();
  }

  const handlePostRequest = async () => {
    try {
      if(applicationId) {
        const postData = {
          application_id: applicationId,
          signed_by_id: userId,
          agree_to_statement: true
        };

        await fetcherPUT(`${FIRM_APPLICATIONS_ROUTE}`, postData);
        window.location.href = '/dashboard';
      } else {
        console.log('PUT request failed')
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <CustomHeader title='Sign' />

      <QAWrapper
        fill
        mainContent={<QuestionContent currentSection={AttestationJSON[1]} />}
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button'
				 aria-disabled={!contributorId}
				 href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.contributorInvitation.link}`}
				 >
          Previous
        </Link>
        <Button type='button' onClick={handleModalToggle}>Submit</Button>
      </ButtonGroup>

      <Modal ref={modalRef} id="example-modal-1" aria-labelledby="modal-1-heading" aria-describedby="modal-1-description">
        <ModalHeading id="modal-1-heading">
          {formSubmitted ? 'Submission Successful' : 'Are you sure?'}
        </ModalHeading>
        <div className="usa-prose">
          <p id="modal-1-description">
					 Are you sure you&apos;re ready to submit your application?
          </p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <Button type='button' onClick={handlePostRequest} className='usa-button usa-button'>
							Submit
            </Button>
            {!formSubmitted && (
              <ModalToggleButton modalRef={modalRef} closer unstyled className="padding-105 text-center">
                Go back
              </ModalToggleButton>
            )}
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </>
  )
}
export default SignPage;
