'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import {
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  Button
} from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { RefObject, useEffect, useState } from 'react'
import styles from '../RtfRfi.module.scss'
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems'

interface ViewSentRFIModalProps {
  selectedItem: IRTFRequestItem | null;
  reasonCodeMap: Record<number, string>;
  modalRef: RefObject<ModalRef>;
  applicationName: string;
}

const ViewSentRFIModal: React.FC<ViewSentRFIModalProps> = ({
  selectedItem,
  reasonCodeMap,
  modalRef,
  applicationName
}) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [selectedItem]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleClose = () => {
    modalRef.current?.toggleModal();
  };

  if (!isReady) {return null;}

  return (
    <Modal
      forceAction
      aria-labelledby="view-sent-rfi-modal"
      aria-describedby="view-sent-rfi-modal"
      ref={modalRef}
      id="view-sent-rfi-modal"
      renderToPortal={false}
      isLarge
    >
      <ModalHeading id="view-sent-rfi-modal-heading" className="full-width">
        <h3>View Sent Request for Information</h3>
      </ModalHeading>

      <div className={styles['modalBody']}>
        {selectedItem && (
          <>
            <div>
              <h4>Subject</h4>
              <p>{`${applicationName} - Request for Information - ${formatDate(selectedItem.opened)}`}</p>
            </div>

            <div>
              <p>
                Additional information is required to complete the review of your MySBA Certification application #{params.application_id}.
                Please provide the following information by {formatDate(selectedItem.opened)} to avoid any further delays in processing your application:
              </p>
            </div>

            <div>
              <h4>List of Issues</h4>
              {selectedItem.items.map((item, index) => (
                <div className='margin-bottom-3' key={index}>
                  <p className='margin-bottom-1'>{reasonCodeMap[item.reason] || 'Unknown Reason'}</p>
                  {item.explanation && <p className='margin-y-0'>{item.explanation}</p>}
                </div>
              ))}
            </div>

            <div>
              <p>
                If you have questions, please contact our main help desk at <a href="tel:+">866-443-4110</a>.
              </p>
            </div>
          </>
        )}
      </div>

      <ModalFooter>
        <Button type="button" unstyled onClick={handleClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewSentRFIModal
