'use client'
import { UPDATE_APPLICATION_STATE_ROUTE } from '@/app/constants/local-routes'
import { Application } from '@/app/services/types/application-service/Application'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeading,
} from '@trussworks/react-uswds'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from './DeleteWithdrawConfirmationModal.module.scss'

interface ModalProps {
  confirmationType: string | undefined,
  openConfirmationModal: boolean,
  clickedId?: number | null,
  applicationData?: Application[],
  resetClickedId?: () => void,
}

const DeleteWithdrawConfirmationModal: React.FC<ModalProps> = ({
  confirmationType,
  openConfirmationModal,
  applicationData,
  clickedId,
  resetClickedId
}) => {
  const [openModal, setOpenModal] = useState<boolean>(openConfirmationModal !== undefined ? true : false)
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null)

  useEffect(() => {
    if (applicationData && clickedId) {
      const foundApplication = applicationData.find(app => app.id === clickedId)
      setCurrentApplication(foundApplication || null)
    }
  }, [applicationData, clickedId])

  const handleBtnClick = async () => {
    try {
      if (!currentApplication || !currentApplication.id || !currentApplication.entity.entity_id) {
        throw new Error('Error with application data');
      }

      const putData = {
        application_id: currentApplication.id,
        entity_id: currentApplication.entity.entity_id,
        state_action: confirmationType
      };

    	await axios.put(`${UPDATE_APPLICATION_STATE_ROUTE}`, putData);
      resetClickedId && resetClickedId()
      setOpenModal(false)
    } catch (error: any) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.log(error)
      }
      setOpenModal(false)
      alert('There was an error processing your request.');
      return;
    }
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
      {openModal && currentApplication && (
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
