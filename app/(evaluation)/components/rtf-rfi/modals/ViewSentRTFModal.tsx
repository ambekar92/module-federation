'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems'
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
import React, { RefObject } from 'react'
import styles from '../RtfRfi.module.scss'

type RTFItemInRequest = {
  id: number;
  explanation: string;
  application: number;
  reason: number;
  author: number;
  request: number;
}

interface ViewSentRTFModalProps {
  selectedItem: IRTFRequestItem | null;
  reasonCodeMap: Record<number, string>;
  modalRef: RefObject<ModalRef>;
  applicationName: string;
}

const ViewSentRTFModal: React.FC<ViewSentRTFModalProps> = ({
  selectedItem,
  reasonCodeMap,
  modalRef,
  applicationName
}) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>();
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  function onClose() {
    modalRef.current?.toggleModal();
  }

  const getNameText = () => {
    switch (userRole) {
      case 'screener':
        return 'Return to Business';
      default:
        return 'Request for Information';
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  const subjectText = selectedItem
    ? `${applicationName} - ${getNameText()} - ${formatDate(selectedItem.opened)}`
    : '';

  if (!selectedItem) {return null;}

  return (
    <Modal
      forceAction
      aria-labelledby="modal-heading"
      aria-describedby="modal-description"
      ref={modalRef}
      id="view-sent-modal"
      isLarge={true}
    >
      <ModalHeading id="view-sent-modal-heading" className="full-width">
        <Label htmlFor="session-modal" className="text-bold">
          <h3>{getNameText()}</h3>
        </Label>
      </ModalHeading>

      <div className={styles['modalBody']}>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <TextInput
            id="subject"
            name="subject"
            type="text"
            className={styles['maxWidth']}
            value={subjectText}
            disabled
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
          {selectedItem.items.map((item: RTFItemInRequest, index: number) => (
            <div className='margin-bottom-3' key={index}>
              <p className='margin-bottom-1'>{reasonCodeMap[item.reason] || 'Unknown Reason'}</p>
              {item.explanation && <p className='margin-y-0'>{item.explanation}</p>}
            </div>
          ))}
        </div>

        <div>
          <p>
            Once you have addressed all issues listed above, please resubmit your application.
            Upon resubmission, your application will be assigned to a screener, who will review the contents of your application package to ensure it is complete.
            If you have not resubmitted your application within 30 days, your application may be removed for inactivity.
            If you have questions, please contact our main help desk at 317-555-0113.
            We also encourage you to visit our resource library at <a href="https://certification.sba.gov/resources" target="_blank" rel="noreferrer">https://certification.sba.gov/resources</a> or meet with a local SBA Resource Partner or District Office for assistance.
            Visit <a href="https://www.sba.gov/tools/local-assistance" target="_blank" rel="noopener noreferrer">https://www.sba.gov/tools/local-assistance</a> to locate the one nearest you.
          </p>
        </div>
      </div>

      <ModalFooter>
        <ButtonGroup className="float-left">
          <Button type="button" unstyled onClick={onClose}>
          	Close
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )
}

export default ViewSentRTFModal
