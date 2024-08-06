'use client'

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
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { RefObject } from 'react'
import styles from '../RtfRfi.module.scss'

interface EditFormModalProps {
  tableData: IRTFItems[];
  reasonCodeMap: Record<number, string>;
	modalRef: RefObject<ModalRef>
}

const FinalizeReturnToFirm: React.FC<EditFormModalProps> = ({
  tableData,
  reasonCodeMap,
  modalRef
}) => {
  const sessionData = useSession()
  const params = useParams<{application_id: string}>();

  function onClose() {
    modalRef.current?.toggleModal();
  }

  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const handleReturnApp = () => {
    onClose()
  }

  return (
    <>
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
              {userRole === 'reviewer' ||
                userRole === 'analyst'
                ? ' Request for Information'
                : userRole === 'screener'
                  ? ' Return to Business'
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
            {tableData.map((item: IRTFItems, index: number) => (
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
								If you have questions, please contact {sessionData.data?.user.name} at 636-555-3226 or our main help desk at 317-555-0113.
								We also encourage you to visit our resource library at <a href="#">www.xxx.sba.gov</a> or meet with a local SBA Resource Partner or District Office for assistance.
								Visit <a href="https://www.sba.gov/tools/local-assistance" target="_blank" rel="noopener noreferrer">https://www.sba.gov/tools/local-assistance</a> to locate the one nearest you.
            </p>
          </div>
        </div>

        <ModalFooter>
          <ButtonGroup className="float-left">
            <Button
              type="button"
              className="float-left usa-button"
              onClick={handleReturnApp}
            >
              {userRole === 'reviewer' || userRole === 'analyst'
                ? 'Send Request for Information'
                : userRole === 'screener'
                  ? 'Return Application to Business'
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
    </>
  )
}

export default FinalizeReturnToFirm
