'use client'

import { useCurrentApplication } from '@/app/(evaluation)/firm/useApplicationData'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { ProgramApplicationType } from '@/app/services/types/application-service/Application'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  Table
} from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { RefObject, useEffect, useState } from 'react'
import useSWR from 'swr'
import DocumentUploadInput from '../../../../shared/components/forms/DocumentUploadInput'
import axios from 'axios'
import { APPLICATION_DOCUMENTS_ROUTE, PROGRAM_APPLICATION, UPDATE_APPLICATION_STATE_ROUTE } from '@/app/constants/local-routes'

interface MakeRecommendationModalProps {
  modalRef: RefObject<ModalRef>
  handleAction: () => void
}

const MakeRecommendationModal: React.FC<MakeRecommendationModalProps> = ({
  modalRef,
  handleAction,
}) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{ application_id: string }>()
  const { data: programData } = useSWR(`${PROGRAM_APPLICATION}/${params.application_id}`)
  const [userId, setUserId] = useState<number | null>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [documentId, setDocumentId] = useState<number>();
  const { applicationData } = useCurrentApplication();

  const { trigger: triggerSubmit } = useCompleteEvalTask()

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData])

  const handleActionSubmit = async () => {
    setLoading(true)
    try {
      await handleMakeSubmitPostRequest()
      onClose()
      handleAction();
    } catch (error) {
      handleAction();
      // Error handled lol -KJ
    } finally {
      setLoading(false)
    }
  }

  const onClose = () => {
    modalRef.current?.toggleModal();
    handleAction();
  }

  const updateMakeRecommendation = async (id: number, recommendation: string) => {
    try {
      const putData = {
        application_id: Number(params.application_id) || 0,
        program_id: id,
        analyst_recommendation: recommendation,
      }
      await axios.put(PROGRAM_APPLICATION, putData)
    } catch (error) {
      console.error('Failed to update recommendation:', error)
    }
  }

  const handleMakeSubmitPostRequest = async () => {
    try {
      const postData = {
        process_id: applicationData?.process?.id,
        data: {
          approved: true,
          tier: applicationData?.application_tier,
          request_ogc_expert: false,
          request_oss_expert: false,
        },
      }

      await triggerSubmit(postData)
      const updateAppStateData = {
        application_id: applicationData?.id,
        state_action: 'final_review',
        user_id: sessionData.data.user_id,
        subject: 'Updated for final review',
        description: 'Updated for final review'
      }
      await axios.put(UPDATE_APPLICATION_STATE_ROUTE, updateAppStateData);
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, {
        application_id: Number(params.application_id),
      }) + '?name=made-recommendation'
    } catch (error) {
      // Error handled lol -KJ
    }
  }

  const handleFileSelect = async (file: File) => {
    setFileData(file)
    try {
      if(userId && applicationData) {
        const formData = new FormData()
        formData.append('files', file)
        formData.append('document_type_id', '1');
        formData.append('internal_document', 'true')
        formData.append('hubzone_key', '1');

        const response = await axios.post(`${APPLICATION_DOCUMENTS_ROUTE}?application_contributor_id=${applicationData.application_contributor[0].id}&entity_id=${applicationData.entity.entity_id}&upload_user_id=${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setDocumentId(response.data.document.id);
      } else {
        throw new Error('Document upload failed')
      }
    } catch (error) {
      // Error handled lol -KJ
    }
  }
  if(!programData) {return}
  return (
    <Modal
      ref={modalRef}
      forceAction
      aria-labelledby="modal-heading"
      aria-describedby="modal-description"
      isLarge
      renderToPortal={false}
      id="action-modal"
    >
      <ModalHeading id="action-modal-heading">
        <Label htmlFor="action-modal">
          <h2 className="text-bold">Make Recommendation</h2>
        </Label>
      </ModalHeading>

      <div className="padding-bottom-4" key="action-modal-file-input">
        <DocumentUploadInput
          name="makeRecommendation"
          label="Upload Documents"
          hint="Upload any documents relevant to this recommendation. (Accepted file formats are .pdf, .png, and .jpg)"
          onFileSelect={handleFileSelect}
          documentId={documentId}
        />
      </div>

      <Table bordered={false} fullWidth>
        <thead>
          <tr>
            <th>Program</th>
            <th>Approve</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {programData.map((program: ProgramApplicationType, i:number) => (
            <tr key={`action-modal-table-tr-${i}`}>
              <td>{program.title}</td>
              <td>
                <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                  <input
                    className='usa-radio__input'
                    id={`action-modal-table-input-tr-${i}-td-approve`}
                    type='radio'
                    value='Approve'
                    name={`action-modal-table-input-tr-${i}`}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateMakeRecommendation(program.program_id, 'approved');
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Label
                    className='usa-radio__label'
                    htmlFor={`action-modal-table-input-tr-${i}-td-approve`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {''}
                  </Label>
                </div>
              </td>
              <td>
                <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                  <input
                    className='usa-radio__input'
                    id={`action-modal-table-input-tr-${i}-td-decline`}
                    type='radio'
                    value='Decline'
                    name={`action-modal-table-input-tr-${i}`}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateMakeRecommendation(program.program_id, 'declined');
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Label
                    className='usa-radio__label'
                    htmlFor={`action-modal-table-input-tr-${i}-td-decline`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {''}
                  </Label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalFooter>
        <ButtonGroup className="float-left">
          <Button
            type="button"
            className="float-left"
            onClick={handleActionSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            type="button"
            className="float-left"
            onClick={onClose}
            outline
          >
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )
}

export default MakeRecommendationModal
