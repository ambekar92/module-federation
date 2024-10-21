import { Alert, Button, Modal, ModalRef } from '@trussworks/react-uswds';
import { RefObject } from 'react';

interface ErrorModalProps {
  modalRef: RefObject<ModalRef>;
  message: string | undefined;
}
function SIPErrorModal({ modalRef, message }: ErrorModalProps) {
  const handleCancel = () => {
    modalRef.current?.toggleModal();
  }

  const formatMessage = (msg: string) => {
    return msg.replace(/\.(?!\s|$)/g, '. ').replace(/^\['|'\]$/g, '');
  };

  return (
    <Modal
      id="sip-error-modal"
      isLarge={true}
      forceAction={true}
      ref={modalRef}
      aria-labelledby="sip-error-modal-heading"
      aria-describedby="sip-error-modal-description"
    >
      {message && (
        <div>
          <Alert
            type="error"
            headingLevel="h3"
            heading={formatMessage(message)}
            id="sip-error-modal-heading"
          />
        </div>
      )}
      <Button
        type="button"
        className="float-right"
        onClick={handleCancel}
      >
            	Close
      </Button>
      <button
        type="button"
        className="usa-button usa-modal__close"
        aria-label="Close this window"
        data-close-modal
        onClick={handleCancel}
      >
        x
      </button>
    </Modal>
  )
}

export default SIPErrorModal;
