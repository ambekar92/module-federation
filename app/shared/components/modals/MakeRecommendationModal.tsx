'use client'

import {
  Button,
  ButtonGroup,
  FileInput,
  FormGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  Table,
} from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import {
  useUpdateMakeRecommendationTask,
  useUploadMakeRecommendationFileTask,
} from '@/app/services/mutations/useUpdateMakeRecommendationTask'
import { useSessionUCMS } from '@/app/lib/auth'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useMakeRecommendation } from '@/app/services/queries/evaluation-service/useMakeRecommendation'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import DocumentUpload from '../../form-builder/form-controls/document-upload/DocumentUpload'
import { useForm, FormProvider } from 'react-hook-form'
import getEntityByUserId from '../../utility/getEntityByUserId'

interface MakeRecommendationModalProps {
  modalRef: RefObject<ModalRef>
  handleAction: () => void
}

const MakeRecommendationModal: React.FC<MakeRecommendationModalProps> = ({
  modalRef,
  handleAction,
}) => {
  const methods = useForm()

  const sessionData = useSessionUCMS()
  const { data, error, isLoading, mutate } = useMakeRecommendation()

  const params = useParams<{ application_id: string }>()
  const { applicationData } = useApplicationData(
    ApplicationFilterType.id,
    params.application_id,
  )

  const table = {
    tableHeader: ['Program', 'Approve', 'Decline'],
    tableRows: [
      ['Program 1', 'radio', 'radio'],
      ['Program 2', 'radio', 'radio'],
      ['Program 3', 'radio', 'radio'],
      ['Program 4', 'radio', 'radio'],
    ],
  }

  const [userId, setUserId] = useState<number | null>(null)
  const [fileData, setFileData] = useState<number | null>(null)
  const { trigger: triggerUpdateRecommend } = useUpdateMakeRecommendationTask()
  const { trigger: triggerUploadFile } = useUploadMakeRecommendationFileTask()
  const { trigger: triggerSubmit } = useCompleteEvalTask()
  const contributorId = parseInt(params.contributor_id as string, 10)

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData, data, error])

  const handleActionSubmit = async () => {
    handleMakeSubmitPostRequest()
    onClose()
  }

  const onClose = () => {
    modalRef.current?.toggleModal()
  }
  const updateMakeRecommendation = async (id: any, name: any) => {
    const putData = {
      application_id: Number(params.application_id) || 0,
      program_id: id,
      analyst_recommendation: name,
    }
    await triggerUpdateRecommend(putData)
  }

  const handleMakeSubmitPostRequest = async () => {
    try {
      const postData = {
        process_id: applicationData?.process?.id || 1,
        data: {
          approved: true,
          tier: applicationData?.application_tier || 1,
          request_ogc_expert: false,
          request_oss_expert: false,
        },
      }

      await triggerSubmit(postData)
      window.location.href =
        buildRoute(FIRM_APPLICATION_DONE_PAGE, {
          application_id: Number(params.application_id),
        }) + '?name=made-recommendation'
    } catch (error: any) {
      console.error('Failed to complete evaluation task', error)
      console.error('Network Error: ', error)
    }
  }

  const handleFileSelect = async (file: any) => {
    setFileData(file)
    const entityData = await getEntityByUserId(userId)
    const uploadData = {
      entity_id: entityData[entityData.length - 1]?.id || 0,
      doc_owner_user_id: userId,
      application_contributor_id: Number(params.application_id),
      internal_document: true,
      files: file,
    }
    await triggerUploadFile(uploadData)
  }

  return (
    <>
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
          <FormProvider {...methods}>
              <DocumentUpload
                name="makeRecommendation"
                label="Upload Documents"
                hint="Upload any documents relevant to this recommendation. (Accepted file formats are .pdf, .png, and .jpg)"
                onFileSelect={handleFileSelect}
              />
          </FormProvider>
        </div>

        <Table bordered={false} fullWidth>
          <thead>
            <tr>
              {table.tableHeader.map((label) => (
                <th
                  key={`action-modal-table-th-${label}`}
                  style={{
                    width: (100 / table.tableHeader.length).toString() + '%',
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
            {data &&
              data.length > 0 &&
              data.map((row: any, i) => (
                <tr key={`action-modal-table-tr-${i}`}>
                  <td>{row.name}</td>
                  <td>
                    <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                      <input
                        className={'usa-radio__input'}
                        id={`action-modal-table-input-tr-${i}-td`}
                        type={'radio'}
                        value={row.name}
                        name={`action-modal-table-input-tr-${i}`}
                        onChange={() => {
                          updateMakeRecommendation(row.id, 'Approve')
                        }}
                      />
                      <Label
                        className={'usa-radio__label'}
                        htmlFor={`action-modal-table-input-tr-${i}-td`}
                      >
                        {null}
                      </Label>
                    </div>
                  </td>
                  <td key={`action-modal-table-tr-${i}-td}`}>
                    <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                      <input
                        className={'usa-radio__input'}
                        id={`action-modal-table-input-tr-${i}-td-del`}
                        type={'radio'}
                        value={row.name}
                        name={`action-modal-table-input-tr-${i}`}
                        onChange={() => {
                          updateMakeRecommendation(row.id, 'Decline')
                        }}
                      />
                      <Label
                        className={'usa-radio__label'}
                        htmlFor={`action-modal-table-input-tr-${i}-td-del`}
                      >
                        {null}
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
            >
              Submit
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
    </>
  )
}

export default MakeRecommendationModal
