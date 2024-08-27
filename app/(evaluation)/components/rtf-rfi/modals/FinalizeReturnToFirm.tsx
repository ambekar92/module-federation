'use client'

import { RETURN_APPLICATION_TO_FIRM } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  TextInput
} from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { RefObject, useState, useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'
import styles from '../RtfRfi.module.scss'

interface EditFormModalProps {
  tableData: IRTFItems[];
  reasonCodeMap: Record<number, string>;
  modalRef: RefObject<ModalRef>;
  mutateDraft: () => void;
  mutateRequest: () => void;
}

const FinalizeReturnToFirm: React.FC<EditFormModalProps> = ({
  tableData,
  reasonCodeMap,
  modalRef,
  mutateDraft,
  mutateRequest
}) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>();
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onClose() {
    modalRef.current?.toggleModal();
  }

  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const contentComponents = useMemo(() => {
    const issuesList = tableData.map((item: IRTFItems, index: number) => (
      <div className='margin-bottom-3' key={index}>
        <p className='margin-bottom-1'>{item?.reason.title}</p>
        {item.explanation && <p className='margin-y-0'>{item.explanation}</p>}
      </div>
    ));

    const additionalInfo = (
      <p>
        Once you have addressed all issues listed above, please resubmit your application.
        Upon resubmission, your application will be assigned to a screener, who will review the contents of your application package to ensure it is complete.
        If you have not resubmitted your application within 30 days, your application may be removed for inactivity.
        If you have questions, please contact {sessionData.data?.user.name} at 636-555-3226 or our main help desk at 317-555-0113.
        We also encourage you to visit our resource library at <a href="#">www.xxx.sba.gov</a> or meet with a local SBA Resource Partner or District Office for assistance.
        Visit <a href="https://www.sba.gov/tools/local-assistance" target="_blank" rel="noopener noreferrer">https://www.sba.gov/tools/local-assistance</a> to locate the one nearest you.
      </p>
    );

    return { issuesList, additionalInfo };
  }, [tableData, sessionData]);

  const generateHTMLContent = () => {
    return `
      <p>Subject: ${subject}</p>
      <p>
        Your application #${params.application_id} has been returned for correction and is now available to edit.
        The following issues were identified and must be resolved before you resubmit your application:
      </p>
      <h4>List of Issues</h4>
      ${ReactDOMServer.renderToString(<>{contentComponents.issuesList}</>)}
      ${ReactDOMServer.renderToString(contentComponents.additionalInfo)}
    `;
  };

  const handleReturnApp = async () => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post(RETURN_APPLICATION_TO_FIRM, {
        application_id: parseInt(params.application_id),
        message: generateHTMLContent()
      })
      mutateDraft();
      mutateRequest();
    } catch(error) {
      // Error handled lol -KJ
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  }

  return (
    <Modal
      forceAction
      aria-labelledby="modal-heading"
      aria-describedby="modal-description"
      ref={modalRef}
      id="invite-modal"
      isLarge={true}
    >
      <ModalHeading id="invite-modal-heading" className="full-width">
        <Label htmlFor="session-modal" className="text-bold">
          <h3>
            Finalize
            {userRole === 'reviewer' || userRole === 'analyst'
              ? ' Request for Information'
              : ' Return to Business'}
          </h3>
        </Label>
      </ModalHeading>

      <div className={styles['modalBody']}>
        <div>
          <Label htmlFor="session-modal">Subject</Label>
          <TextInput
            id="subject"
            name="subject"
            type="text"
            className={styles['maxWidth']}
            placeholder="Stark Tech, LLC - Return to Business - 07/22/2024"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <p>
            Your application #{params.application_id} has been returned for correction and is now available to edit.
            The following issues were identified and must be resolved before you resubmit your application:
          </p>
        </div>

        <div>
          <h4>List of Issues</h4>
          {contentComponents.issuesList}
        </div>

        <div>
          {contentComponents.additionalInfo}
        </div>
      </div>

      <ModalFooter>
        <ButtonGroup className="float-left">
          <Button
            type="button"
            className="float-left usa-button"
            onClick={handleReturnApp}
            disabled={isSubmitting || !subject}
          >
            {isSubmitting ? 'Submitting...' : userRole === 'reviewer' || userRole === 'analyst'
              ? 'Send Request for Information'
              : 'Return Application to Business'}
          </Button>
          <span
            className={`${styles['actionButton']}`}
            onClick={onClose}
          >
            Cancel
          </span>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )
}

export default FinalizeReturnToFirm
