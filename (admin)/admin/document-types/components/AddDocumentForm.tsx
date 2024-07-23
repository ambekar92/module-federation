'use client'
import React, { useRef, useState, useEffect } from 'react'
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
} from '@trussworks/react-uswds'
import styles from '../../users/components/DeleteUser.module.scss'

interface ModalsAddUsers {
  showAlert?: any
  bodyData?: any
  rowCount?: number
  onAddDocument?: any
}

interface newDocumentInterface {
  id: number
  document_category: object,
  name: string

  description: string
  document_class: string
}

export const ModalsAddUsers: React.FC<ModalsAddUsers> = ({
  showAlert,
  bodyData,
  rowCount,
  onAddDocument,
}) => {

  //const [data, setData] = useState([] as any | newDocumentInterface[])

  const [showBlankMessageUser, setShowBlankMessageUser] = useState(false)
  //const [showNewUserAlert, setShowNewUserAlert] = useState(false)

  const nameTextRef = useRef<HTMLInputElement>(null)
  const descriptionTexRef = useRef<HTMLInputElement>(null)
  const doc_classTexRef = useRef<HTMLInputElement>(null)

  const newName = nameTextRef.current?.value || ''
  const newDescription = descriptionTexRef.current?.value || ''
  const newDocumentClass = doc_classTexRef.current?.value || ''

  useEffect(() => {

  }, [rowCount]);

  const newId = rowCount ? rowCount + 1 : 1
  const [newUser, setNewUser] = useState<newDocumentInterface>({
    id: newId,
    name: '',
    document_category: {},
    description: '',
    document_class: '',
  })

  const handleSave = () => {
    setNewUser({
      id: newId,
      document_category: {},
      name: newName,
      description: newDescription,
      document_class: newDocumentClass,
    })

    onAddDocument(newUser)

    if (
      newUser.name !== '' &&
      newUser.description !== '' &&
      newUser.document_class !== ''
    ) {
      modalRef.current?.toggleModal()
    }
    if (
      (
        newUser.name === '' &&
        newUser.description === '' &&
        newUser.document_class === '') ||
      newUser.name === '' ||
      newUser.description === '' ||
      newUser.document_class === '--'
    ) {
      setShowBlankMessageUser(true)
    }
  }

  const modalRef = useRef<ModalRef>(null)
  const handleModalToggle = () => {
    modalRef.current?.toggleModal()
  }

  return (
    <div>
      <ModalToggleButton outline modalRef={modalRef} opener>
        + Add User
      </ModalToggleButton>

      <>
        <Modal
          className="usa-modal--lg"
          ref={modalRef}
          id="example-modal-1"
          aria-labelledby="modal-1-heading"
          aria-describedby="modal-1-description"
          forceAction={true}
          modalRoot="#modal-root"
        >
          <ModalHeading id="modal-1-heading">Add Documents</ModalHeading>

          <Grid row>
            <Grid className="flex-1 margin-right-2">
              <Label  style={{ color: 'gray' }} requiredMarker={true} htmlFor="name">
                Name
              </Label>

              <input
                className={styles['text-field']}
                name="name"
                id="name"
                type="text"
                placeholder="--"
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              {showBlankMessageUser && (
                <div className="margin-top-1">
                  <span className="usa-input-helper-text error-message">
                    {'Required Field'}
                  </span>
                </div>
              )}
            </Grid>
            <Grid className="flex-1">
              <Label  style={{ color: 'gray' }} requiredMarker={true} htmlFor="description">
                Description
              </Label>

              <>
                <input
                  className={styles['text-field']}
                  name="description"
                  id="description"
                  type="description"
                  placeholder="--"
                  onChange={(e) =>
                    setNewUser({ ...newUser, description: e.target.value })
                  }
                />
                {showBlankMessageUser && (
                  <div className="margin-top-1">
                    <span className="usa-input-helper-text error-message">
                      {'Required Field'}
                    </span>
                  </div>
                )}
              </>
            </Grid>
          </Grid>
          <Grid
            className="grid-row border-top margin-top-2 margin-bottom-2"
            row
          ></Grid>
          <Grid className="grid-row" row>
            <Grid className="margin-top-2">
              <label style={{ color: 'gray' }}>Document Class</label>

              <>
                <input
                  className={styles['text-field']}
                  name="document_class"
                  id="document_class"
                  type="document_class"
                  placeholder="--"
                  onChange={(e) =>
                    setNewUser({ ...newUser, document_class: e.target.value })
                  }
                />
                {showBlankMessageUser && (
                  <div className="margin-top-1">
                    <span className="usa-input-helper-text error-message">
                      {'Required Field'}
                    </span>
                  </div>
                )}
              </>
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
                <Button
                  type="button"
                  onClick={handleSave}
                  className="float-right usa-button"
                >
                  Add User(s)
                </Button>
              </ButtonGroup>
            </Grid>
          </ModalFooter>
        </Modal>
      </>
    </div>
  )
}
