'use client'

import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
} from '@trussworks/react-uswds'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './Modals.module.scss'


interface CloseApplicationProps {
  open: boolean
  title: string
  handleAction: (param: any) => void
  handleCancel: () => void
  description: string
}

const CloseApplication: React.FC<CloseApplicationProps> = ({
  open,
  title,
  handleAction,
  handleCancel,
}) => {
  const [description, setDescription] = useState("");

  const handleActionSubmit = async () => {
    handleAction(description)
  }

  return (
    <>
      {open === true && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isLarge
          isInitiallyOpen
          renderToPortal={false}
          id="action-modal"
        >
          <ModalHeading id="action-modal-heading">
            <Label htmlFor="action-modal">
              <h2 className="text-bold">{title}</h2>
            </Label>
          </ModalHeading>

          <div className='margin-top-4'>
            <p className={`${styles['field-title']}`}>Description field for Analyst text</p>
            <textarea
              className={`${styles['textarea-field']}`}
              id="description"
              name="description"
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
                className="float-left"
                onClick={handleCancel}
                outline
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

export default CloseApplication
