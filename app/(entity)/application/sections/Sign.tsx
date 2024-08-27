'use client'
import { FIRM_APPLICATIONS_ROUTE, FIRM_EVALUATIONS_ROUTE, QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes';
import { APPLICATION_STEP_ROUTE, DASHBOARD, buildRoute } from '@/app/constants/url';
import { axiosInstance } from '@/app/services/axiosInstance';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Accordion, Button, ButtonGroup, Checkbox, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import useSWR from 'swr';
import { QuestionnaireListType } from '../components/questionnaire/utils/types';
import fetcher from '@/app/services/fetcher';

function SignPage() {
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext();
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Sign Application');
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const { data: questionnairesData, error } = useSWR<QuestionnaireListType>(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
    fetcher
  );

  useEffect(() => {
    if (applicationData && applicationData.workflow_state !== 'draft' && applicationData.workflow_state !== 'returned_for_firm') {
      window.location.href = `/application/view/${applicationId}`;
    }
  }, [applicationData, applicationId]);

  useEffect(() => {
    if (questionnairesData) {
      const allCompleted = questionnairesData.every(
        (questionnaire) => questionnaire.status === 'Completed'
      );
      setIsCheckboxDisabled(!allCompleted);
    }
  }, [questionnairesData]);

  useEffect(() => {
    dispatch(setStep(applicationSteps.sign.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleModalToggle = () => {
    if (isChecked) {
      if(formSubmitted) {
        setFormSubmitted(false);
      }
      modalRef.current?.toggleModal();
    }
  }

  const handlePostRequest = async () => {
    try {
      if(applicationId) {
        const putData = {
          application_id: applicationId,
          signed_by_id: userId,
          agree_to_statement: true
        };

        const postData = {
          application_id: applicationId,
        };

        // const res1 = await fetcherPUT(`${FIRM_APPLICATIONS_ROUTE}`, putData);
        // console.log(res1)
        // const res2 = await fetcherPOST(FIRM_EVALUATIONS_ROUTE, postData);
        // console.log(res2)

        await axiosInstance.put(`${FIRM_APPLICATIONS_ROUTE}`, putData);
        await axiosInstance.post(FIRM_EVALUATIONS_ROUTE, postData);
        window.location.href = buildRoute(DASHBOARD, {});
      } else {
        console.log('PUT request failed')
      }
    } catch (error) {
      console.log(error) // temp fix
      window.location.href = buildRoute(DASHBOARD, {}); // temp fix
      // alert(error);
    }
  };

  const testItems: AccordionItemProps[] = [
    {
      id: 'Review',
      title: 'Review',
      content: <div className='padding-2 bg-base-lightest text-bold border-left-05 border-primary radius-sm text-primary'>Sign</div>,
      expanded: true,
      headingLevel: 'h2'
    }
  ]
  const sidebarContent = <Accordion className='margin-top-2' items={testItems} multiselectable={true} />;
  return (
    <>
      <QAWrapper
        fill
        sidebar={sidebarContent}
        mainContent={
          <div>
            <h1>Attestation</h1>
            <p className='margin-bottom-5'>By clicking the Submit button, you are certifying that you are an owner of the company listed below and that you authorized to represent it and electronically sign on its behalf.</p>
            <p className='margin-bottom-5'>I certify on my own behalf, and on behalf of the applicant, that the information provided in this application and any document or supplemental information submitted, is true and correct as evidenced by the electronic signature confirmation. If assistance was obtained in completing this application and/or submitting supporting documentation, I further certify that I have personally reviewed the information and it is true and accurate.</p>
            <p className='margin-bottom-5'>I certify that I will immediately inform SBA within 30 days of any changed circumstances that could adversely affect the applicant’s eligibility for the program(s) for which it has applied.</p>
            <p className="margin-bottom-5">I acknowledge that any intentional or negligent misrepresentation of the information contained in this certification may result in criminal, civil, or administrative sanctions including, but no limited to: 1) fines of up to $500,000, an imprisonment of up to 10 years, or both as set forth in 15 U.S.C § 645 and 18 U.S.C § 1001, as well as any other applicable criminal laws; 2) treble damages and civil penalties under the False Claim Act; 3) double damages and civil penalties under the Program Fraud Civil Remedies Act; 4) suspension and/or debarment from all Federal procurement and non-procurement transactions; and 5) program termination.</p>

            <div className='padding-2 bg-accent-cool-darker'>
              <h2 className='text-white margin-top-0'>Signature</h2>
              <Checkbox
                className='bg-accent-cool-darker attestation-checkbox'
                id={'sign-application'} name={'sign-application'}
                label={'I hereby certify that any information provided via my Username/Password pair has been reviewed by me personally, and is true and accurate.'}
                disabled={isCheckboxDisabled || error}
                onChange={handleCheckboxChange}
                checked={isChecked}
              />
            </div>
          </div>
        }
      />

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        <Link className='usa-button'
          aria-disabled={!applicationId}
          href={buildRoute(APPLICATION_STEP_ROUTE, {
            applicationId: applicationId,
            stepLink: applicationSteps.contributorInvitation.link
          })}
        >
          Previous
        </Link>
        <Button
          type='button'
          onClick={handleModalToggle}
          disabled={!isChecked || isCheckboxDisabled || error}
        >
          Submit
        </Button>
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
