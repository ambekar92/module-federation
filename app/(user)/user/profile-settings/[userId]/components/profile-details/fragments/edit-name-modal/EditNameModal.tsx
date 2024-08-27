'use client'
import {
  ButtonGroup,
  Modal,
  ModalFooter,
  Button,
  ModalHeading,
} from '@trussworks/react-uswds'
import { useState } from 'react'
import { Grid, Label, TextInput } from '@trussworks/react-uswds';

import styles from './EditNameModal.module.scss'

interface EditNameProps {
  openModal?: boolean,
  closeModal?: (status: boolean) => void
}

const EditNameModal: React.FC<EditNameProps> = ({ openModal, closeModal }) => {
  const [open, setOpen] = useState<boolean>(openModal !== undefined ? true : false)
  const [firstName, setFirstName] = useState();
  const [publicName, setPublicName] = useState();

  const handleGoBack = () => {
    setOpen(false)
    closeModal?.(false)
  }

  return (
    <>
      {open && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isInitiallyOpen
          id="editName-modal"
          className={styles['editName-modal']}
        >

          {/* <ModalHeading id="modal-1-heading">
            <p>Are you sure you want to continue?</p>
          </ModalHeading> */}

          <div className="usa-prose">

            <Grid row col={12}>

              <Grid row col={12}>
                <Label className="text-bold margin-top-0" htmlFor="name-label">
                  Are you sure you want to continue?
                </Label>
                <Label className="margin-top-0" htmlFor="name-label">
                  To change your full/public name enter below.
                </Label>
              </Grid>
              <Grid row col={12}>
                <Grid mobile={{ col: 12 }} desktop={{ col: 12 }}>
                  <Label className="text-bold" htmlFor="name-label">
                    Enter Name *
                  </Label>
                  <TextInput
                    id='enterName'
                    name='enterName'
                    type="text"
                    className={'icon width-full maxw-full border-secondary-vivid'}
                    value={firstName}
                  />
                </Grid>
                <Grid mobile={{ col: 12 }} desktop={{ col: 12 }}>
                  <Label className="text-bold" htmlFor="name-label">
                    Public Name *
                  </Label>
                  <TextInput
                    id='publictName'
                    name='publictName'
                    type="text"
                    className={'icon width-full maxw-full border-secondary-vivid'}
                    value={publicName}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>

          <ModalFooter>
            <ButtonGroup className={styles['text']}>
              <Button type="button" onClick={handleGoBack} outline>
                Go Back
              </Button>
              <Button type='button'>
                Submit
              </Button>
            </ButtonGroup>
          </ModalFooter>

        </Modal>
      )}
    </>
  )
}

export default EditNameModal
