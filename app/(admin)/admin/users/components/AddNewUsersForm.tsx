'use client'
import React, { useRef, useState, useEffect } from 'react'
import {
  Modal,
  ModalToggleButton,
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
  onAddUser: any
  rowCount: number
}
interface newNewUserInterface{
  id: number
  Name: string
  Email: string
  Role: string
  Permissions:string
  Status: string
  Edit: 'Edit',
  Delete: 'Delete',
}

interface newUserInterface {
  id:number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  is_staff: boolean,
  is_superuser: boolean,
  is_active: boolean,
  last_login: string,
  date_joined: string
}
export const ModalsAddUsers: React.FC<ModalsAddUsers> = ({
  showAlert,
  onAddUser,
  rowCount,
}) => {
  const [showBlankMessageUser, setShowBlankMessageUser] = useState(false)

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

  useEffect(() => {

  }, [rowCount]);

  const newId = rowCount ? rowCount + 1 : 1
  const [newUser, setNewUser] = useState<newUserInterface>({
    id: newId,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: true,
    is_superuser: true,
    is_active: true,
    last_login: '',
    date_joined: ''
  })

  const handleSave = () => {
    setNewUser({
      id:newId,
      username:'',
      first_name:newName,
      last_name:'',
      email: newEmail,
      is_staff:newRole ==='true'? true: false,
      is_superuser:newPermission ==='true'? true: false,
      is_active: newStatus ==='true'? true: false,
      last_login:'',
      date_joined:'',

    })

    onAddUser(newUser)
    showAlert(true)
    if (
      newUser.first_name !== '' &&
      newUser.email !== '' &&
      newRole !== '--' &&
      newPermission !== '--' &&
      newStatus !== '--'

    ) {
      modalRef.current?.toggleModal()
    }
    if (
      (newUser.first_name === '' &&
        newUser.email === '' &&
        newRole === '--' &&
        newPermission === '--' &&
        newStatus === '--')||

      newUser.first_name === '' ||
      newUser.email === '' ||
      newRole === '--' ||
      newPermission === '--' ||
      newStatus === '--'
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
          <p
            style={{
              fontFamily: 'Source Sans Pro',
              fontWeight: 700,
              fontSize: '19.5px',
            }}
          >
            Add New User
          </p>

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
                  setNewUser({ ...newUser, first_name: e.target.value })
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
                    setNewUser({ ...newUser, email: e.target.value })
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
            style={{ color: '#E7E8E9' }}
            className="grid-row border-top margin-top-2 margin-bottom-2"
            row
          ></Grid>
          <Grid className="grid-row" row>
            <Grid className="margin-top-2">
              <label style={{ color: 'gray' }}>Role</label>

              <select
                id="role"
                style={{ width: '150px' }}
                name="selectedOptionRole"
                onChange={(e) =>
                  setNewUser({ ...newUser, is_staff: e.target.value === 'true' })
                }
                className="usa-select"
                ref={roleSelectRef}
              >
                <option value="">--</option>
                <option value="true">Staff</option>
                <option value="false">Not Staff</option>
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
                style={{ width: '170px' }}
                name="selectedOptionStatus"
                className="usa-select"
                onChange={(e) =>
                  setNewUser({ ...newUser, is_superuser: e.target.value=== 'true'  })
                }
              >
                <option value="">--</option>
                <option value="true">Access All</option>
                <option value="false">View Only</option>
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
              <label style={{ color: 'gray' }}> Activate/Deactivate</label>

              <select
                id="role"
                style={{ width: '220px' }}
                name="selectedOptionPermission"
                className="usa-select"
                onChange={(e) =>
                  setNewUser({ ...newUser, is_active: e.target.value=== 'true'  })
                }
              >
                <option value="">--</option>
                <option value="true">Activate</option>
                <option value="false">Deactivate</option>
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
