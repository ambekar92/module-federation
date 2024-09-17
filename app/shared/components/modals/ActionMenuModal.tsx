'use client'

import { ASSIGN_USER_VIEWFLOW_ROUTE, USER_ROUTE } from '@/app/constants/local-routes'
import fetcher from '@/app/services/fetcher'
import {
  Button,
  ButtonGroup,
  FileInput,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  Radio,
  Table,
  Textarea,
} from '@trussworks/react-uswds'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import StepsIndicator from '../forms/StepsIndicator'

interface ActionMenuModalProps {
  open: boolean
  process_id: number
  userIdType: string
  modalType: string
  title: string
  description: string
  inputDescription: string
  actionLabel: string
  steps?: string[]
  id: number
  table?: {
    step: number
    tableHeader: string[]
    tableRows: []
  };
  signature?: {
    step: number
    description: string
  }
  upload?: boolean
  uploadStep?: number
  notes?: {
    step: number
    rows: []
  }
  approvalLetter?: {
    step: number
    rows: []
  }
  handleAction: () => void
  handleCancel: () => void
}

const ActionMenuModal: React.FC<ActionMenuModalProps> = ({
  open,

  userIdType,
  modalType,
  title,
  actionLabel,
  description,
  inputDescription,
  steps = [],
  id,
  table = {
    step: -1,
    tableHeader: [],
    tableRows: [],
  },
  signature = {
    step: -1,
    description: '',
  },
  upload = false,
  uploadStep = -1,
  notes = {
    step: -1,
    rows: [],
  },
  approvalLetter = {
    step: -1,
    rows: [],
  },
  handleAction,
  handleCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [requiredFields, setRequiredFields] = useState({
    signature: false,
    contributor: '',
    veteranInfo: '',
  })
  const [assignedUser, setAssignedUser] = useState('')
  const { data, error } = useSWR<any>(USER_ROUTE, fetcher)
  const [userData, setUserData] = useState([])
  const {application_id: process_id } = useParams();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const onChange = (e: ChangeEvent<any>, field: string) => {
    field === 'contributor' ||
      (field === 'veteranInfo' &&
        setRequiredFields({ ...requiredFields, [field]: e.target.value }))
    field === 'signature' &&
      setRequiredFields({
        ...requiredFields,
        [field]: !requiredFields[field],
      })
    modalType === 'reassign' && setAssignedUser(e.target.value)
  }

  const handleAssignUser = async () => {
    try {
      const postData = {
        process_id: process_id,
        [userIdType]: parseInt(assignedUser),
      }

      await axios.put(`${ASSIGN_USER_VIEWFLOW_ROUTE}`, postData)
    } catch (error: any) {
      console.error('Network Error: ', error)
      return
    }
  }

  useEffect(() => {
    if (data) {
      setUserData(data)
    }
  }, [data])

  useEffect(() => {
    setCurrentStep(0)
    setRequiredFields({
      signature: false,
      contributor: '',
      veteranInfo: '',
    })
  }, [id])

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
            {title}
          </ModalHeading>

          {steps.length > 0 && (
            <StepsIndicator currentStep={currentStep} steps={steps} />
          )}
          {upload && uploadStep === currentStep && (
            <div className="padding-bottom-4" key="action-modal-file-input">
              <Label
                className="text-bold padding-bottom-1"
                htmlFor="action-modal-file-input"
              >
                Upload Documents
              </Label>
              <span className="usa-hint" id="action-modal-file-input-hint">
                Only .pdf and .txt file formats are accepted
              </span>
              <FileInput
                className="maxw-full width-full"
                id="action-modal-file-input"
                name="action-modal-file-input"
                accept=".pdf,.txt"
                aria-describedby="action-modal-file-input-hint"
                multiple
              />
            </div>
          )}
          {notes.step === currentStep && (
            <div>
              <Label className="text-light" htmlFor="action-modal-notes-table">
                Analyst Notes
              </Label>
              <Table bordered fullWidth>
                <thead>
                  <tr>
                    <th key="action-modal-notes-table-th">
                      <span className="display-flex flex-column flex-align-center text-light">
                        WYSIIWYG
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notes.rows.map((row: any, i) => (
                    <tr key={`action-modal-notes-table-tr-${i}`}>
                      <td key={`action-modal-table-tr-${i}-td`}>
                        <div className="padding-bottom-2">
                          <Label
                            className="padding-bottom-2"
                            htmlFor="action-modal-notes-table"
                          >
                            {`Note ${i + 1} Subject Line`}
                          </Label>
                          <span className="display-flex flex-column flex-align-center text-light">
                            {row}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {table.step === currentStep && table.tableHeader.length > 0 && (
            <Table bordered={false} fullWidth>
              <thead>
                <tr>
                  {table.tableHeader.map((label) => (
                    <th
                      key={`action-modal-table-th-${label}`}
                      style={{
                        width:
                          (100 / table.tableHeader.length).toString() + '%',
                      }}
                    >
                      <span className="display-flex flex-column flex-align-center text-light">
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.tableRows.map((row: any, i) => (
                  <tr key={`action-modal-table-tr-${i}`}>
                    {row.map((col: any, index: number) => (
                      <td key={`action-modal-table-tr-${i}-td${index}`}>
                        {col === 'radio' || col === 'checkbox' ? (
                          <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                            <input
                              className={
                                col === 'radio'
                                  ? 'usa-radio__input'
                                  : 'usa-checkbox__input'
                              }
                              id={`action-modal-table-input-tr-${i}-td-${index}`}
                              type={col === 'radio' ? 'radio' : 'checkbox'}
                              value={table.tableHeader[index]}
                              name={`action-modal-table-input-tr-${i}`}
                            />
                            <Label
                              className={
                                col === 'radio'
                                  ? 'usa-radio__label'
                                  : 'usa-checkbox__label'
                              }
                              htmlFor={`action-modal-table-input-tr-${i}-td-${index}`}
                            >
                              {null}
                            </Label>
                          </div>
                        ) : (
                          <span className="display-flex flex-column flex-align-center text-light">
                            {' '}
                            {col}{' '}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {approvalLetter.step === currentStep && (
            <div>
              <div className="display-flex flex-row flex-justify">
                <Label
                  className="text-light"
                  htmlFor="action-modal-notes-table"
                >
                  Combined Approval Letter
                </Label>
                <Button type="button" className="float-left" outline>
                  View PDF
                </Button>
              </div>
              <Table bordered fullWidth>
                <thead>
                  <tr>
                    <th key="action-modal-notes-table-th">
                      <span className="display-flex flex-column flex-align-center text-light">
                        WYSIIWYG
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {approvalLetter.rows.map((row: any, i) => (
                    <tr key={`action-modal-notes-table-tr-${i}`}>
                      <td key={`action-modal-table-tr-${i}-td`}>
                        <div className="padding-bottom-2">
                          <Label
                            className="padding-bottom-2"
                            htmlFor="action-modal-notes-table"
                          >
                            {`${i + 1}. Subject Line`}
                          </Label>
                          <span className="display-flex flex-column flex-align-center text-light">
                            {row}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {signature.step === currentStep && (
            <>
              <Label htmlFor="action-modal" className="text-bold">
                <h4>Signature</h4>
              </Label>
              <div className="padding-bottom-4">
                <input
                  className="usa-checkbox__input"
                  id="action-modal-signature-checkbox"
                  type="checkbox"
                  value="checked"
                  name="checked"
                  onClick={(e) => {
                    onChange(e, 'signature')
                  }}
                />
                <Label
                  className="usa-checkbox__label maxw-full width-full"
                  htmlFor="action-modal-signature-checkbox"
                >
                  {signature.description}
                </Label>
              </div>
            </>
          )}
          {modalType === 'default' && (
            <div className="usa-prose">{description}</div>
          )}
          {(modalType === 'textarea' ||
            modalType === 'confirmVeteranStatus' ||
            modalType === 'requestExpert' ||
            modalType === 'reassign') && (
            <>
              {modalType === 'requestExpert' && (
                <>
                  <Label
                    htmlFor="expert-input-radio"
                    className="text-bold padding-bottom-2"
                  >
                    Choose SBA Office
                  </Label>
                  <div className="display-flex flex-fill padding-bottom-3">
                    <Radio
                      className="padding-right-3"
                      id="expert-input-radio-general-counsel"
                      name="expert-input-radio"
                      label="Office of General Counsel"
                    />
                    <Radio
                      className="padding-left-3"
                      id="veteran-input-radio-size-standards"
                      name="veteran-input-radio"
                      label="Office of Size Standards"
                    />
                  </div>
                </>
              )}
              {modalType === 'confirmVeteranStatus' && (
                <>
                  <Label
                    htmlFor="veteran-input-radio"
                    className="text-bold padding-bottom-2"
                  >
                    After VA review, what is the final veteran status?
                  </Label>
                  <div className="display-flex flex-fill padding-bottom-3">
                    <Radio
                      className="padding-right-3"
                      id="veteran-input-radio-yes"
                      name="veteran-input-radio"
                      label="Confirm Veteran"
                    />
                    <Radio
                      className="padding-left-3"
                      id="veteran-input-radio-no"
                      name="veteran-input-radio"
                      label="Confirm Not Veteran"
                    />
                  </div>
                </>
              )}
              {(modalType === 'reassign' || modalType === 'requestExpert') && (
                <>
                  <Label
                    htmlFor="user-select"
                    className="text-light"
                    requiredMarker={modalType === 'requestExpert'}
                  >
                    {modalType === 'reassign'
                      ? 'Select User'
                      : 'Select Contributor'}
                  </Label>
                  <select
                    className="usa-select maxw-full width-full"
                    name="user-select"
                    id="user-select"
                    data-placeholder="user-select"
                    onChange={(e) => {
                      modalType === 'requestExpert' &&
                        onChange(e, 'contributor')
                      modalType === 'reassign' && onChange(e, '')
                    }}
                  >
                    <option value="">--</option>
                    {userData &&
                      userData.map((user: any, index: number) => {
                        return (
                          <option
                            key={user.id}
                            value={user.id}
                          >{`${user.last_name}, ${user.first_name}`}</option>
                        )
                      })}
                  </select>
                </>
              )}
              <Label
                htmlFor="action-modal-textarea"
                className="text-light"
                requiredMarker={modalType === 'confirmVeteranStatus'}
              >
                <p>{description}</p>
              </Label>
              <p>{inputDescription}</p>
              <Textarea
                className="display-flex flex-col maxw-full width-full"
                id="action-modal-textarea"
                name="action-modal-textarea"
                onChange={(e) => {
                  modalType === 'confirmVeteranStatus' &&
                    onChange(e, 'veteranInfo')
                }}
              ></Textarea>
            </>
          )}

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left"
                onClick={
                  steps.length < 1 ||
                  (steps.length > 0 && currentStep === steps.length - 1)
                    ? modalType === 'reassign'
                      ? handleAssignUser
                      : handleAction
                    : handleNext
                }
                disabled={
                  (modalType === 'requestExpert' &&
                    !requiredFields.contributor) ||
                  (signature.step === currentStep &&
                    !requiredFields.signature) ||
                  (modalType === 'confirmVeteranStatus' &&
                    !requiredFields.veteranInfo)
                }
              >
                {steps.length < 1 ||
                (steps.length > 0 && currentStep === steps.length - 1)
                  ? actionLabel
                  : 'Continue'}
              </Button>
              <Button
                type="button"
                className="float-left usa-button--unstyled"
                onClick={handleCancel}
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
            onClick={handleCancel}
          >
            x
          </button>
        </Modal>
      )}
    </>
  )
}

export default ActionMenuModal
