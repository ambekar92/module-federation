'use client'
import React, { useRef, useState } from 'react'
import {
  Modal,
  ModalToggleButton,
  ModalHeading,
  ModalFooter,
  ButtonGroup,
  Button,
  ModalRef,
  Grid,
  Label,
  Link,
} from '@trussworks/react-uswds'

import styles from './DeleteUser.module.scss'
interface DeleteIconProps {
  onClick: () => void;
}

const ModalsDeleteUser: React.FC<DeleteIconProps> = ({ onClick }) => {

  const modalRef = useRef<ModalRef>(null)

  const handleModalToggle = () => {
    modalRef.current?.toggleModal()
  }

  return (
    <>
      <ModalToggleButton className={styles['modal-button']} modalRef={modalRef} opener>
        <img
          className="margin-right-1 margin-top-1"
          style={{ cursor: 'pointer' }}
          src="/AdminIcons/sba_Admin_Delete.png"
          alt="delete"
        />
      </ModalToggleButton>
      <Modal
        className="usa-modal--lg"
        ref={modalRef}
        id="example-modal-1"
        aria-labelledby="modal-1-heading"
        aria-describedby="modal-1-description"
        forceAction={true}
        modalRoot="#modal-root"
      >
        <ModalHeading id="modal-1-heading"> Are You Sure?</ModalHeading>
        <Grid row>
          <Grid>
            {' '}
            <Label requiredMarker={true} htmlFor="Email">
              Are you sure you want to delete this user?
            </Label>
            {/* <ErrorMessage>{methods.formState.errors?.orgName?.message}</ErrorMessage> */}
          </Grid>
        </Grid>
        <ModalFooter>
          <Grid className="display-flex flex-column flex-align-end" row>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-right"
                onClick={handleModalToggle}
                outline
              >
                Cancel
              </Button>
              <Link
                href={'#'}
                className="float-right usa-button"
                onClick={onClick}
              >
                Delete
              </Link>
            </ButtonGroup>
          </Grid>
        </ModalFooter>
      </Modal>
    </>
  )
}
export default ModalsDeleteUser
