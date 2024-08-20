'use client'

import React, { RefObject, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'
import styles from './Modals.module.scss'

interface CloseApplicationProps {
  modalRef: RefObject<ModalRef>
  title: string
  handleAction: (param: string) => void
}

const CloseApplication: React.FC<CloseApplicationProps> = ({
  modalRef,
  title,
  handleAction,
}) => {
  const [description, setDescription] = useState('')

  const handleActionSubmit = async () => {
    handleAction(description)
    onClose()
  }

  const onClose = () => {
    setDescription('')
    modalRef.current?.toggleModal()
  }

  return (
    <Modal
      forceAction
      ref={modalRef}
      aria-labelledby="modal-heading"
      aria-describedby="modal-description"
      isLarge
      id="close-application-modal"
    >
      <ModalHeading id="close-application-modal-heading">
        <Label htmlFor="close-application-modal">
          <h2 className="text-bold">{title}</h2>
        </Label>
      </ModalHeading>

      <div className='margin-top-4'>
        <p className={`${styles['field-title']}`}>
          Closing this application will end the review process.
          The business will be notified, and they will be allowed to re-apply at anytime.
        </p>
        <p className={`${styles['field-title']}`}>
          Provide more information about why you are closing this application
        </p>
        <textarea
          className={`${styles['textarea-field']}`}
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <ModalFooter>
        <ButtonGroup className="float-left">
          <Button
            type="button"
            className="float-left"
            onClick={handleActionSubmit}
          >
            Close Application
          </Button>
          <Button
            type="button"
            className="float-left usa-button--unstyled"
            onClick={onClose}
            outline
          >
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
      <button
        type="button"
        className="usa-button usa-modal__close"
        aria-label="Close this window"
        data-close-modal
        onClick={onClose}
      >
        x
      </button>
    </Modal>
  )
}

export default CloseApplication
