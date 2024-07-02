'use client'
import React, { useState } from 'react'
import {
  ButtonGroup,
  Modal,
  ModalHeading,
  ModalFooter,
  Button,
} from '@trussworks/react-uswds'
import styles from './DeleteWithdrawConfirmationModal.module.scss'
import { fetcherPUT } from '@/app/services/fetcher'
import { UPDATE_APPLICATION_STATE } from '@/app/constants/routes'

interface ModalProps {
  confirmationType: string | undefined
  openConfirmationModal: boolean,
	entityId: number | undefined
}

const DeleteWithdrawConfirmationModal: React.FC<ModalProps> = ({
  confirmationType,
  openConfirmationModal,
  entityId = 1
}) => {
  const [openModal, setOpenModal] = useState<boolean>(
    openConfirmationModal !== undefined ? true : false,
  )

  const handleBtnClick = async () => {
    try {
      const putData = {
        entity_id: entityId,
        application_id: 1,
        state_action: confirmationType
      };

      await fetcherPUT(`${UPDATE_APPLICATION_STATE}`, putData);
      alert(`Success! Your application has been ${confirmationType}.`)
    } catch (error: any) {
			 alert('There was an error processing your request.');
      return;
    }
    setOpenModal(false)
  }

  const deleteModalBody = (
    <div>
      By deleting your application, all information and documentation will be
      removed.
    </div>
  )

  const withdrawModalBody = (
    <>
      <div>
        By withdrawing your application, your application will be closed and all
        entered information will be deleted.
      </div>
      <div className={styles['withdrawModalBody']}>
        Any documents uploaded by you and your contributors will be retained, in
        the document center, for you to use should you choose to apply at a
        later time.
      </div>
    </>
  )

  return (
    <>
      {openModal && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isInitiallyOpen
          id="delete-withdraw-confirmation-modal"
          className={styles['delete-withdraw-confirmation-modal']}
        >
          <div>
            <ModalHeading className={styles['modalHeading']}>
              Are you sure you want to {confirmationType}?
            </ModalHeading>
          </div>
          {confirmationType === 'delete' ? deleteModalBody : withdrawModalBody}
          <ModalFooter>
            <ButtonGroup>
              <Button type="button" onClick={handleBtnClick}>
                {confirmationType === 'delete'
                  ? 'Delete Application'
                  : 'Withdraw Application'}
              </Button>
              <Button
                type="button"
                unstyled
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default DeleteWithdrawConfirmationModal
