// DeleteConfirmationModal.tsx
import React from 'react';
import { Modal, ModalHeading, ModalFooter, ButtonGroup, Button } from '@trussworks/react-uswds';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete
}) => {

  if(!isOpen) {
    return null
  }

  return (
    <Modal
      id="delete-confirmation-modal"
      forceAction
      aria-labelledby="delete-confirmation-modal"
      aria-describedby="delete-confirmation-modal"
      isInitiallyOpen
      renderToPortal={false}
      className='padding-x-4 padding-top-3'
    >
      <ModalHeading>Are you sure you want to delete this Request for Information?</ModalHeading>
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
