'use client'
import { UPDATE_APPLICATION_STATE } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/axiosInstance'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeading,
} from '@trussworks/react-uswds'
import React, { useState } from 'react'
import styles from './DeleteWithdrawConfirmationModal.module.scss'
import { Application } from '@/app/services/types/application-service/Application'

interface ModalProps {
  confirmationType: string | undefined,
  openConfirmationModal: boolean,
	entityId?: number | null | undefined
	clickedId?: number | null,
	applicationData?: Application[],
	resetClickedId?: () => void,
}

const DeleteWithdrawConfirmationModal: React.FC<ModalProps> = ({
  confirmationType,
  openConfirmationModal,
  applicationData,
  clickedId, resetClickedId
}) => {
  const [openModal, setOpenModal] = useState<boolean>(
    openConfirmationModal !== undefined ? true : false,
  )

  const handleBtnClick = async () => {
    try {
      const application = applicationData?.filter(app => (
        app.id === clickedId
      ))
      if (!application) {
        return
      }

      const putData = {
        application_id: application[0].id,
        entity_id: application[0].entity.entity_id,
        state_action: confirmationType
      };

      const adverb = confirmationType === 'delete' ? 'deleted' : 'withdrawn';

      console.log(adverb)
      await axiosInstance.put(`${UPDATE_APPLICATION_STATE}`, putData);
      alert(`Success! Your application has been ${adverb}.`)
      resetClickedId && resetClickedId()
    } catch (error: any) {
      console.log(error)
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
                className='padding-left-2'
                onClick={() => {setOpenModal(false)}}
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
