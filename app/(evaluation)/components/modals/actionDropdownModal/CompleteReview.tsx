'use client'
import React, {useState} from 'react'

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

interface CompleteReviewProps {
  open: boolean
  title: string
  handleAction: () => void
  handleCancel: () => void
}
const approvalLetter = {
  rows: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ],
}

const CompleteReview: React.FC<CompleteReviewProps> = ({
  open,
  title,
  handleAction,
  handleCancel,
}) => {
  const [requiredFields, setRequiredFields] = useState(true)

  const handleActionSubmit = async () => {
    handleAction()
  }

  const onChange = (e: ChangeEvent<any>, field: string) => {
    field === 'signature' && setRequiredFields(!requiredFields)
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

          <div>
            <div className="display-flex flex-row flex-justify">
              <Label className="text-light" htmlFor="action-modal-notes-table">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Label>
            </div>
          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left"
                onClick={handleActionSubmit}
                disabled={requiredFields}
              >
                Sign and Submit
              </Button>
              {/* <Button
                type="button"
                className="float-left"
                onClick={handleActionSubmit}
              >
                Confirm
              </Button> */}
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

export default CompleteReview
