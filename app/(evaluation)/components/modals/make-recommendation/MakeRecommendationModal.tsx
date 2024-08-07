'use client'

import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData'
import { GET_DOCUMENTS, MAKE_RECOMMENDATION_ROUTE } from '@/app/constants/routes'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
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
import DocumentUploadInput from '../../../../shared/components/forms/DocumentUploadInput'

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

  const [userId, setUserId] = useState<number | null>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const [programData, setProgramData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { applicationData } = useApplicationData(
    ApplicationFilterType.id,
    params.application_id,
  )

  const { trigger: triggerSubmit } = useCompleteEvalTask()

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData])

  useEffect(() => {
    fetchProgramData()
  }, [])

  const fetchProgramData = async () => {
    try {
      const response = await axiosInstance.get(`${MAKE_RECOMMENDATION_ROUTE}/${params.application_id}`)
      setProgramData(response.data)
    } catch (error) {
      // Error handled lol -KJ
    }
  }

  const handleActionSubmit = async () => {
    setLoading(true)
    try {
      await handleMakeSubmitPostRequest()
      onClose()
    } catch (error) {
      // Error handled lol -KJ
    } finally {
      setLoading(false)
    }
  }

  const onClose = () => {
    modalRef.current?.toggleModal()
  }

  const updateMakeRecommendation = async (id: number, recommendation: string) => {
    try {
      const putData = {
        application_id: Number(params.application_id) || 0,
        program_id: id,
        analyst_recommendation: recommendation,
      }
      await axiosInstance.put(MAKE_RECOMMENDATION_ROUTE, putData)
    } catch (error) {
      console.error('Failed to update recommendation:', error)
    }
  }

  const handleMakeSubmitPostRequest = async () => {
    try {
      const postData = {
        process_id: applicationData?.process.id,
        data: {
          approved: true,
          tier: applicationData?.application_tier,
          request_ogc_expert: false,
          request_oss_expert: false,
        },
      }

      await triggerSubmit(postData)
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
      const formData = new FormData()
      formData.append('entity_id', applicationData?.entity.entity_id.toString() || '0')
      formData.append('doc_owner_user_id', userId?.toString() || '')
      formData.append('application_contributor_id', params.application_id)
      formData.append('internal_document', 'true')
      formData.append('file', file)

      await axiosInstance.post(GET_DOCUMENTS, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } catch (error) {
      // Error handled lol -KJ
    }
  }

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
          {programData.map((program, i) => (
            <tr key={`action-modal-table-tr-${i}`}>
              <td>{program.name}</td>
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
                      updateMakeRecommendation(program.id, 'Approve');
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
                      updateMakeRecommendation(program.id, 'Decline');
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
