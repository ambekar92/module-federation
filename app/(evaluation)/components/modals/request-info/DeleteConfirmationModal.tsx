// DeleteConfirmationModal.tsx
import React, { RefObject } from 'react';
import { Modal, ModalHeading, ModalFooter, ButtonGroup, Button, ModalRef } from '@trussworks/react-uswds';

interface DeleteConfirmationModalProps {
  onDelete: () => void;
	userRole: string;
	modalRef: RefObject<ModalRef>
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onDelete,
  userRole,
  modalRef
}) => {

  function onClose() {
    modalRef.current?.toggleModal();
  }
  return (
    <Modal
      id="delete-confirmation-modal"
      forceAction
      aria-labelledby="delete-confirmation-modal"
      aria-describedby="delete-confirmation-modal"
      ref={modalRef}
      isLarge
      renderToPortal={false}
      className='padding-x-4 padding-top-3'
    >
      <ModalHeading>Are you sure you want to delete this {userRole === 'screener' ? 'Return to Business' : 'Request for Information'}?</ModalHeading>
      <ModalFooter className='margin-top-5'>
        <ButtonGroup>
          <Button type="button" onClick={onDelete} >
            Yes, Delete
          </Button>
          <Button className='padding-left-2' type="button" onClick={onClose} unstyled>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteConfirmationModal;
