import { Application } from '@/app/services/types/application-service/Application';
import { Alert, Button, Modal, ModalRef } from '@trussworks/react-uswds';
import { RefObject } from 'react';

interface ErrorModalProps {
  applicationData: Application | null;
	modalRef: RefObject<ModalRef>;
	message: string | undefined
}
function SIPErrorModal({ applicationData, modalRef, message }: ErrorModalProps) {
  const handleCancel = () => {
    modalRef.current?.toggleModal();
  }

  return (
    <Modal
      id="sip-error-modal"
      isLarge={true}
      forceAction={true}
      ref={modalRef}
      aria-labelledby="sip-error-modal"
      aria-describedby="sip-error-modal"
    >
      {applicationData && (
        <div>
          <Alert type="error" headingLevel="h3" heading={message?.replace(/^\['|'\]$/g, '')}>
            <Button
              type="button"
              className="float-right"
              onClick={handleCancel}
            >
            Close
            </Button>
          </Alert>
        </div>
      )}
    </Modal>
  )
}
export default SIPErrorModal
