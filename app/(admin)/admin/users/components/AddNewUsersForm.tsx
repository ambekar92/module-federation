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
} from '@trussworks/react-uswds'
import styles from './DeleteUser.module.scss'

interface ModalsAddUsers {
  showAlert: any
  bodyData: any
  onAddUser: any
}

export const ModalsAddUsers: React.FC<ModalsAddUsers> = ({
  showAlert,
  bodyData,
  onAddUser,
}) => {
  const newId =
    bodyData.length > 0
      ? Math.max(...bodyData.map((item: any) => item.id)) + 1
      : 1
  const [newUser, setNewUser] = useState({
    id: newId,
    Name: '',
    Email: '',
    Role: '',
    Permissions: '',
    Status: '',
    Edit: 'Edit',
    Delete: 'Delete',
  })

  const [showBlankMessageUser, setShowBlankMessageUser] = useState(false)
  const [showNewUserAlert, setShowNewUserAlert] = useState(false)

  const nameTextRef = useRef<HTMLInputElement>(null)
  const emailTexRef = useRef<HTMLInputElement>(null)
  const roleSelectRef = useRef<HTMLSelectElement>(null)
  const permissionSelectRef = useRef<HTMLSelectElement>(null)
  const actDevCheckRef = useRef<HTMLSelectElement>(null)

  const newName = nameTextRef.current?.value || ''
  const newEmail = emailTexRef.current?.value || ''
  const newRole = roleSelectRef.current?.value || ''
  const newPermission = permissionSelectRef.current?.value || ''
  const newStatus = actDevCheckRef.current?.value || ''

  const handleAddRecord = (newRecord: any) => {
    onAddUser(newUser)
  }
  const handleSave = () => {
    setNewUser({
      id:
        bodyData.length > 0
          ? Math.max(...bodyData.map((item: any) => item.id)) + 1
          : 1,
      Name: newName,
      Email: newEmail,
      Role: newRole,
      Permissions: newPermission,
      Status: newStatus,
      Edit: 'Edit',
      Delete: 'Delete',
    })

    onAddUser(newUser)

    if (
      newUser.Name !== '' &&
      newUser.Email !== '' &&
      newUser.Role !== '--' &&
      newUser.Permissions !== '--' &&
      newUser.Status !== '--'
    ) {

      modalRef.current?.toggleModal()
    }
    if (
      (newUser.Name === '' &&
        newUser.Email === '' &&
        newUser.Role === '--' &&
        newUser.Permissions === '--' &&
        newUser.Status === '--') ||
      newUser.Name === '' ||
      newUser.Email === '' ||
      newUser.Role === '--' ||
      newUser.Permissions === '--' ||
      newUser.Status === '--'
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
          <ModalHeading id="modal-1-heading">Add New User</ModalHeading>

          <Grid row>
            <Grid className="flex-1 margin-right-2">
              <Label requiredMarker={true} htmlFor="email">
                Name
              </Label>

              <input
                className={styles['text-field']}
                name="name"
                id="name"
                type="text"
                placeholder="--"
                onChange={(e) =>
                  setNewUser({ ...newUser, Name: e.target.value })
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
              <Label requiredMarker={true} htmlFor="email">
                Email
              </Label>

              <>
                <input
                  className={styles['text-field']}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="--"
                  onChange={(e) =>
                    setNewUser({ ...newUser, Email: e.target.value })
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
              <label style={{ color: 'gray' }}>Role</label>

              <select
                id="role"
                name="selectedOptionRole"
                onChange={(e) =>
                  setNewUser({ ...newUser, Role: e.target.value })
                }
                className="usa-select"
                ref={roleSelectRef}
              >
                <option value="">--</option>
                <option value="Owner">Owner</option>
                <option value="Administrator">Administrator</option>
                <option value="Viewer">Viewer</option>
                <option value="Basic Editor">Basic Editor</option>
                <option value="Manager">Manager</option>
              </select>
              {showBlankMessageUser && (
                <div className="margin-top-1">
                  <span className="usa-input-helper-text error-message">
                    {'Required Field'}
                  </span>
                </div>
              )}
            </Grid>
            <Grid className="margin-left-2 margin-top-2">
              <label style={{ color: 'gray' }}>Permissions</label>
              <select
                id="role"
                name="selectedOptionStatus"
                className="usa-select"
                onChange={(e) =>
                  setNewUser({ ...newUser, Permissions: e.target.value })
                }
              >
                {' '}
                <option value="">--</option>
                <option value="Access All">Access All</option>
                <option value="Activate/Deactivate">Activate/Deactivate</option>
                <option value="Add User">Add User</option>
                <option value="Basic Editing">Basic Editor</option>
                <option value="View Only">View Only</option>
              </select>{' '}
              {showBlankMessageUser && (
                <div className="margin-top-1">
                  <span className="usa-input-helper-text error-message">
                    {'Required Field'}
                  </span>
                </div>
              )}
            </Grid>
            <Grid className="margin-left-2 margin-top-2">
              <label style={{ color: 'gray' }}> Activate/Deactivate</label>

              <select
                id="role"
                name="selectedOptionPermission"
                className="usa-select"
                onChange={(e) =>
                  setNewUser({ ...newUser, Status: e.target.value })
                }
              >
                {' '}
                <option>--</option>
                <option value="Activate">Activate</option>
                <option value="Deactivate">Deactivate</option>
              </select>
              {showBlankMessageUser && (
                <div className="margin-top-1">
                  <span className="usa-input-helper-text error-message">
                    {'Required Field'}
                  </span>
                </div>
              )}
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
