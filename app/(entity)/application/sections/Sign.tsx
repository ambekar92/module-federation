'use client'
import { APPLICATION_STEP_ROUTE, DASHBOARD, buildRoute } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { InvitationType } from '@/app/services/types/application-service/Application';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Role } from '@/app/shared/types/role';
import { Accordion, Button, ButtonGroup, Checkbox, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from '@trussworks/react-uswds';
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { QuestionnaireListType } from '../components/questionnaire/utils/types';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import { APPLICATION_CONTRIBUTORS_ROUTE, EVALUATIONS_ROUTE, INVITATION_ROUTE, QUESTIONNAIRE_ROUTE, UPDATE_APPLICATION_ROUTE } from '@/app/constants/local-routes';
import axios from 'axios';
import { useRedirectIfNoOwners } from '../hooks/useRedirectNoOwners';
import { Question } from '@/app/shared/types/questionnaireTypes';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useCheckOwnersPercent } from '../hooks/useCheckOwnersPercent';

/**
 * SignPage is the final page of the application process, where the user signs and submits the application.
 * @param {string} applicationId - The ID of the application being submitted.
 * @param {string} userId - The ID of the user submitting the application.
 * @param {string} contributorId - The ID of the contributor submitting the application.
 * @param {ApplicationData} applicationData - The application data.
 * @returns {ReactNode} The SignPage component.
 */
function SignPage() {
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext();
  const session = useSessionUCMS();
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Sign Application');
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [allContributorsSubmitted, setAllContributorsSubmitted] = useState(false);
  const [allInvitationsAccepted, setAllInvitationsAccepted] = useState(false);
  const [isHundredPercentOwners, setIsHundredPercentOwners] = useState(false);
  const [alertMessages, setAlertMessages] = useState<string[]>([]);

  const { data: questionnairesData, error } = useSWR<QuestionnaireListType>(contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}` : null);
  const { data: invitationData } = useSWR<InvitationType[]>(contributorId ? `${INVITATION_ROUTE}/${contributorId}`: null);

  const getUserRole = () => {
    if (!applicationData || !userId) {return null;}
    const currentUser = applicationData.application_contributor.find(
      contributor => contributor.user.id === userId
    );
    return currentUser?.application_role.name;
  };

  const userRole = getUserRole();

  const { data: ownerData } = useSWR<Question[]>((userRole === 'primary-qualifying-owner' && applicationData) ? `${QUESTIONNAIRE_ROUTE}/${applicationData?.application_contributor[0].id}/owner-and-management` : null);
  const { totalOwnershipPercentage } = useCheckOwnersPercent(ownerData || []);
  const applicationRole = applicationData?.application_contributor.filter(contributor => contributor.id === contributorId)
  useRedirectIfNoOwners({ ownerData, applicationId, applicationRole });
  useEffect(() => {
    dispatch(setStep(applicationSteps.sign.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, []);

  useEffect(() => {
    {/* todo: return_to_firm is a temp fix until BE fix it */}
    const invalidWorkflowStates = ['draft', 'returned_to_firm', 'return_to_firm'];
    const invalidRoles = [
      Role.DELEGATE,
    ];

    const userRole = session.data?.permissions[session.data.permissions.length - 1].slug;
    const isInvalidRole = userRole && invalidRoles.includes(userRole);

    const currentUserContributor = applicationData?.application_contributor.find(
      contributor => contributor.user_id === session.data?.user.id
    );

    const isValidWorkflowState = currentUserContributor && invalidWorkflowStates.includes(currentUserContributor.workflow_state);

    // Todo: need to allow multiple userRole for isInvaldRole check @notkijana
    // if (isValidWorkflowState === false) {
    //   window.location.href = `/application/view/${applicationId}`;
    // }
  }, [applicationData, applicationId, session.data]);

  useEffect(() => {
    if(totalOwnershipPercentage >= 99 && totalOwnershipPercentage <= 100) {
      setIsHundredPercentOwners(true);
    } else {
      setIsHundredPercentOwners(false);
      if(userRole === 'primary-qualifying-owner') {
        setAlertMessages(prev => [...prev, 'Total ownership must be 100%. Current total: ' + totalOwnershipPercentage.toFixed(2) + '%']);
      }
    }
  }, [totalOwnershipPercentage]);

  useEffect(() => {
    if (applicationData && applicationData.application_contributor) {
      const nonOwnerContributors = applicationData.application_contributor.filter(
        contributor => !['primary-qualifying-owner', 'analyst', 'supervisor'].includes(contributor.application_role.name)
      );

      if (nonOwnerContributors.length === 0) {
        setAllContributorsSubmitted(true);
      } else {
        const allSubmitted = nonOwnerContributors.every(
          (contributor) => contributor.workflow_state === 'submitted'
        );
        setAllContributorsSubmitted(allSubmitted);
        const allCompleted = questionnairesData && questionnairesData.length > 0 && questionnairesData.every(
          (questionnaire) => questionnaire.status === 'Completed'
        );

        if (!allCompleted) {
          setAlertMessages(prev => [...prev, 'All questionnaires must be completed before you can sign the application.']);
        }
      }
    }
  }, [applicationData]);

  useEffect(() => {
    if (invitationData && invitationData.length > 0) {
      const allAccepted = invitationData.filter(
        (invitation) => invitation.invitation_status !== 'accepted' && invitation.invitation_status !== 'removed' && invitation.application_role.name !== 'delegate'
      );

      if (allAccepted.length > 0) {
        setAllInvitationsAccepted(false);
      } else {
        setAllInvitationsAccepted(true);
      }
    } else {
      setAllInvitationsAccepted(true);
    }
  }, [invitationData]);

  useEffect(() => {
    if (questionnairesData && questionnairesData.length > 0) {
      const allCompleted = questionnairesData && questionnairesData.length > 0 && questionnairesData.every(
        (questionnaire) => questionnaire.status === 'Completed'
      );

      setAlertMessages([]);

      if (userRole === 'primary-qualifying-owner') {
        const isDisabled = !allCompleted || !allContributorsSubmitted || !allInvitationsAccepted; //todo hundredPrecent is not working. ucms-2930 || !isHundredPercentOwners;
        setIsCheckboxDisabled(isDisabled);

        if (isDisabled) {
          if (!allCompleted) {
            setAlertMessages(prev => [...prev, 'All questionnaires must be completed before you can sign the application.']);
          }
          if (!allContributorsSubmitted) {
            setAlertMessages(prev => [...prev, 'All contributors must submit their applications before you can sign.']);
          }
          if (!allInvitationsAccepted) {
            setAlertMessages(prev => [...prev, 'All contributor invitations must be accepted and their applications submitted prior to signing the application..']);
          }
          if (isHundredPercentOwners) {
            setAlertMessages(prev => [...prev, 'Total ownership must be 100%. Current total: ' + totalOwnershipPercentage.toFixed(2) + '%']);
          }
        }
      } else {
        setIsCheckboxDisabled(!allCompleted);
        if (!allCompleted) {
          setAlertMessages(['You must complete all questionnaires before you can sign the application.']);
        }
      }
    } else {
      setIsCheckboxDisabled(true);
    }
  }, [questionnairesData, allContributorsSubmitted, allInvitationsAccepted]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleModalToggle = () => {
    if (isChecked) {
      if (formSubmitted) {
        setFormSubmitted(false);
      }
      if (userRole === 'primary-qualifying-owner') {
        if (allContributorsSubmitted && allInvitationsAccepted) {
          modalRef.current?.toggleModal();
        } else {
          alert('Before signing, all contributors must submit their application and accept their invitation.');
        }
      } else {
        handlePostRequest();
      }
    }
  }

  const handlePostRequest = async () => {
    try {
      if(applicationId) {
        if (userRole !== 'primary-qualifying-owner') {
          await axios.put(`${APPLICATION_CONTRIBUTORS_ROUTE}/${contributorId}`, { workflow_state: 'submitted' });
          window.location.href = buildRoute(DASHBOARD, {});
        } else {
          const putData = {
            application_id: applicationId,
            signed_by_id: userId,
            agree_to_statement: true
          };

          const postData = {
            application_id: applicationId,
          };
          await axios.put(`${UPDATE_APPLICATION_ROUTE}`, putData);
          await axios.post(EVALUATIONS_ROUTE, postData);
          window.location.href = buildRoute(DASHBOARD, {});
        }
      } else {
        // Error handled
      }
    } catch (error) {
      alert('There was an error submitting your application, please try again.')
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

  if (!applicationData || !userId || !userRole || (userRole === 'primary-qualifying-owner' && !ownerData)) {
    return <Spinner />;
  }
  return (
    <>
      <QAWrapper
        fill
        sidebar={sidebarContent}
        mainContent={
          <div>
            {(alertMessages.length > 0) && (
              <div className="usa-alert usa-alert--warning" role="alert">
                <div className="usa-alert__body">
                  <h3 className="usa-alert__heading">Incomplete Application</h3>
                  <ul>
                    {alertMessages.map((alert, index) => (
                      <li key={index} className="usa-alert__text margin-left-neg-3">{alert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {userRole === 'primary-qualifying-owner' ? (
              <>
                <h1>Attestation</h1>
                <p className='margin-bottom-5'>By clicking the Submit button, you are certifying that you are an owner of the company listed below and that you authorized to represent it and electronically sign on its behalf.</p>
                <p className='margin-bottom-5'>I certify on my own behalf, and on behalf of the applicant, that the information provided in this application and any document or supplemental information submitted, is true and correct as evidenced by the electronic signature confirmation. If assistance was obtained in completing this application and/or submitting supporting documentation, I further certify that I have personally reviewed the information and it is true and accurate.</p>
                <p className='margin-bottom-5'>I certify that I will immediately inform SBA within 30 days of any changed circumstances that could adversely affect the applicant’s eligibility for the program(s) for which it has applied.</p>
                {applicationData?.program_application.some(program => program.programs.name === 'hubzone') && (
                  <>
                    <p className="margin-bottom-5">The applicant’s principal office is located in a HUBZone.</p>
                    <p className="margin-bottom-5">At least 35% of the applicant&apos;s employees reside in a HUBZone. When determining the percentage of employees that reside in a HUBZone, if the percentage results in a fraction, the applicant has rounded to the nearest whole number.</p>
                    <p className="margin-bottom-5">The applicant represents that it has no information to indicate that any of the claimed HUBZone residents reside at an address other than the HUBZone address provided in the application.</p>
                    <p className="margin-bottom-5">The applicant represents that it will make good faith efforts to “attempt to maintain” (see 13 C.F.R. § 126.103) having 35% of its employees reside in a HUBZone during the performance of any HUBZone contract it receives.</p>
                  </>
                )}
                <p className="margin-bottom-5">I acknowledge that any intentional or negligent misrepresentation of the information contained in this certification may result in criminal, civil, or administrative sanctions including, but no limited to: 1) fines of up to $500,000, an imprisonment of up to 10 years, or both as set forth in 15 U.S.C § 645 and 18 U.S.C § 1001, as well as any other applicable criminal laws; 2) treble damages and civil penalties under the False Claim Act; 3) double damages and civil penalties under the Program Fraud Civil Remedies Act; 4) suspension and/or debarment from all Federal procurement and non-procurement transactions; and 5) program termination.</p>
              </>
            ): (
              <>
                <h1>Attestation</h1>
                <p className='margin-bottom-5'>
									Pursuant to 18 U.S.C. § 1001 and 15 U.S.C. § 645, any person who makes any false statement in order to influence the certification or continuing eligibility process in any
									way or to obtain a contract awarded under the preference programs established pursuant to section 8(a), 8(d), 9, or 15 of the Small Business Act, or any other provision
									of Federal Law that references section 8(a) or 8(d) for a definition of program eligibility, shall be: (1) subject to fines and imprisonment of up to 5 years, or both, a stated in 18
									U.S.C. § 1001 and subject to fines of up to $500,000 and imprisonment of up to 10 years, or both as stated in 15 U.S.C. § 645; (2) subject to suspension or termination as
									a Participant in the 8(a) Program; (3) subject to civil and administrative remedies, including suspension and debarment; and (4) ineligible for participation in programs
									conducted under the authority of the Small Business Act.
                </p>
                <p className='margin-bottom-5'>I hereby certify that any information provided via my Username/Password pair has been reviewed by me personally and is true and accurate.</p>
              </>
            )}

            <div className='padding-2 bg-accent-cool-darker'>
              <h2 className='text-white margin-top-0'>Signature</h2>
              <Checkbox
                className={'bg-accent-cool-darker attestation-checkbox'}
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
            stepLink: applicationRole && applicationRole.length > 0 && (applicationRole[0].application_role.name === 'primary-qualifying-owner' || applicationRole[0].application_role.name === 'delegate') ? applicationSteps.contributorInvitation.link : applicationSteps.documentUpload.link
          })}
        >
          Previous
        </Link>
        <Button
          type='button'
          onClick={handleModalToggle}
          disabled={
            !isChecked || isCheckboxDisabled || error ||
            (userRole === 'primary-qualifying-owner' && (!allContributorsSubmitted || !allInvitationsAccepted || !isHundredPercentOwners))
          }
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
