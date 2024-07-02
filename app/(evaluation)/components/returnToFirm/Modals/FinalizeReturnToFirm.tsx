'use client'

import React, { useState, useEffect } from 'react'
import {
  ButtonGroup,
  Modal,
  ModalHeading,
  ModalFooter,
  Button,
  Label,
  Select,
  Textarea,
  TextInput
} from '@trussworks/react-uswds'
import styles from '../ReturnToFirm.module.scss'
import { getSuffix } from '../utils/validate'
import QuillEditorReact from '../Editor/QuillEditorReact';

interface EditFormModalProps {
  open: boolean
  handleSend: (data:any) => void
  handleCancel: () => void
  tableData: any
}

const FinalizeReturnToFirm: React.FC<EditFormModalProps> = ({
  open,
  handleSend,
  handleCancel,
  tableData
}) => {

  const [editorContent, setEditorContent] = useState('');
  const handleEditorChange = (content:any) => {
    setEditorContent(content);
  };
  const [editorContentClose, setEditorContentClose] = useState('');
  const handleEditorChangeClose = (content:any) => {
    setEditorContentClose(content);
  };

  const [tableRowData, setTableRowData] = useState([]);
  const handleEdit = (id: any) => {
    const updatedItems = tableRowData.filter((item: any) => item.id !== id);
    setTableRowData(updatedItems);
  }

  useEffect(() => {
    setTableRowData(tableData)
  }, [tableData])

  const handleReturnApp=()=>{
    handleSend(tableRowData)
  }
  

  return (
    <>
      {open === true && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isInitiallyOpen
          id="invite-modal"
          isLarge={true}
        >
          <ModalHeading id="invite-modal-heading" className='full-width'>
            <Label htmlFor="session-modal" className="text-bold">
              <h3>Finalize Return to Firm</h3>
            </Label>
          </ModalHeading>

          <div className={styles['modalBody']}>
            <div>
              <Label htmlFor="session-modal">
                Subject
              </Label>
              <TextInput
                id="subject"
                name="subject"
                type="text"
                className={styles['maxWidth']}
                placeholder='Stark Tech, LLC - Return to Firm - 06/10/2024'
              />
            </div>
            <div>
              <Label htmlFor="session-modal">
                Created by
              </Label>
              <TextInput
                id="createdby"
                name="createdby"
                type="text"
                className={styles['maxWidth']}
                placeholder='Mary McAnalyst'
              />
            </div>
            <div>
              <Label htmlFor="session-modal">
                Introductory Paragraph
              </Label>
              <QuillEditorReact
                value={editorContent}
                onChange={handleEditorChange}
              />
            </div>

            <Label htmlFor="session-modal" className="text-bold">
              <h3>List of Issues</h3>
            </Label>

            <div>

              {tableRowData.length >0 && tableRowData.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    <Label htmlFor="session-modal">
                      {index + 1}{getSuffix(index + 1)} Reason? *
                    </Label>
                    <Select id="input-select" name="input-select" className={styles['maxWidth']}>
                      <option>{item.reason}</option>
                    </Select>

                    <span className={`${styles['actionDelete']}`} onClick={() => handleEdit(item.id)}>{item.action2}</span>

                    <Label htmlFor="session-modal">
                      Description (Optional)
                    </Label>
                    <Textarea id="description" name="description" className={`${styles.maxWidth} ${styles.maxHeight}`} defaultValue={item.description} />
                  </div>
                )
              })}
            </div>

            <div>
              <Label htmlFor="session-modal">
                Closing Paragraph
              </Label>
              <QuillEditorReact
                value={editorContentClose}
                onChange={handleEditorChangeClose}
              />
            </div>

          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left usa-button"
                onClick={handleReturnApp}
              >
                Return Application to Firm
              </Button>
              <span
                className={`${styles['actionButton']}`}
                onClick={handleCancel}
              >
                Cancel
              </span>

            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default FinalizeReturnToFirm
