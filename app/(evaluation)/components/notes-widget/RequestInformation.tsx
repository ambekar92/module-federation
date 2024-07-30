'use client'
import { DRAFT_RTF_ITEMS_ROUTE, RTF_ITEMS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'
import Close from '@mui/icons-material/Close'
import { Alert, Button, ButtonGroup, Label } from '@trussworks/react-uswds'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useApplicationData } from '../../firm/useApplicationData'
import styles from '../Evaluation.module.scss'
import DeleteConfirmationModal from '../modals/request-info/DeleteConfirmationModal'
import RequestInfoModal from '../modals/request-info/RequestInfoModal'
import { useParams } from 'next/navigation'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'

interface IRtfDraft {
  application_id: number;
  author_id: number;
  explanation: string;
  reason: string;
}

function RequestInformation() {
  const params = useParams<{application_id: string}>();
  const {applicationData} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const sessionData = useSessionUCMS()
  const { data: draftData, error: draftError } = useSWR<IRtfDraft>(applicationData ? `${DRAFT_RTF_ITEMS_ROUTE}/${applicationData.id}` : null, fetcher);
  const { data: reasonCodes, error } = useSWR<ReasonCode[]>(REASON_CODE_ROUTE, fetcher);
  const [ postSuccess, setPostSuccess ] = useState<boolean>(false);
  const [ displayAlert, setDisplayAlert ] = useState<boolean>(false);
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false);

  const [reason, setReason] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    if (draftData && 'reason' in draftData && 'explanation' in draftData) {
      setReason(draftData.reason);
      setExplanation(draftData.explanation);
    }
  }, [draftData]);

  if(error) {
    console.log(error);
  }

  if(draftError) {
    console.log(draftError);
  }

  const handlePostRequest = async () => {
    try {
      const requestData = {
        application_id: applicationData?.id,
        author_id: sessionData.data?.user_id,
        explanation,
        reason
      };

      let response;

      if (postSuccess || draftData) {
        response = await axiosInstance.put(`${RTF_ITEMS_ROUTE}/${applicationData?.id}`, requestData);
      } else {
        response = await axiosInstance.post(RTF_ITEMS_ROUTE, requestData);
      }

      setPostSuccess(true);
      setDisplayAlert(true);
      setIsModalOpen(false);

      if (response.data) {
        setReason(response.data.reason);
        setExplanation(response.data.explanation);
      }

    } catch (error: any) {
      console.error('Failed to complete evaluation task', error)
      setPostSuccess(false);
    }
  }

  const handleClear = () => {
    setReason('');
    setExplanation('');
  }

  const handleCloseAlert = () => {
    setDisplayAlert(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const handleDelete = async () => {
    try {
      if(draftData) {
        await axiosInstance.delete(`${RTF_ITEMS_ROUTE}?id=${draftData.application_id}&author_id=${draftData.author_id}`);
        setIsDeleteModalOpen(false);
        handleClear()
      } else {
        throw error
      }
    } catch (error: any) {
      console.error('Failed to delete RTI', error)
    }
  }

  return (
    <>
      <div>
        <div>
          <Label htmlFor='reason-code' requiredMarker className={`${styles['field-title']}`}>What&apos;s your reason?</Label>
          <div className="usa-combo-box margin-top-05">
            <select
              className={`usa-select ${styles['dropdown-text']}`}
              name="reason-code"
              id="reason-code"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              {reasonCodes && reasonCodes.map(code => (
                <option value={code.action_type} key={code.id}>{code.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='margin-top-4'>
          <Label htmlFor='description-analyst' className={`${styles['field-title']}`} requiredMarker>Description</Label>
          <textarea
            className={`${styles['textarea-field']}`}
            id="description-analyst"
            name="description-analyst"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          ></textarea>
        </div>

        <ButtonGroup className='grid-row margin-top-3'>
          <div className="grid-col-6">
            <Button className="usa-button--outline" type="button" onClick={handleClear}>Cancel</Button>
          </div>
          <div className="grid-col-6">
            <Button type="button" onClick={handlePostRequest}>
              {postSuccess || draftData
                ? 'Update'
                : 'Create'
              }
            </Button>
          </div>
        </ButtonGroup>

        {(draftData?.application_id || postSuccess) && (
          <ButtonGroup className='display-flex flex-justify margin-top-3'>
            <Button type='button' className={`${styles['field-title']}`} unstyled onClick={handleOpenModal}>Highest Compensated</Button>
            <Button type='button' className={`${styles['field-title']}`} unstyled onClick={handleOpenDeleteModal}>Delete</Button>
          </ButtonGroup>
        )}

        {postSuccess && displayAlert && (
          <Alert
            type='success'
            headingLevel='h6'
            heading='Success.'
            className={`${styles['alert-text']}`}
            slim
          >
            {''}RTI Created.
            <Button
              unstyled
              className='text-black'
              type='button'
              onClick={handleCloseAlert}
            >
              <Close />
            </Button>
          </Alert>
        )}
      </div>
      <RequestInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reason={reason}
        setReason={setReason}
        explanation={explanation}
        setExplanation={setExplanation}
        reasonCodes={reasonCodes}
        onSave={handlePostRequest}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />
    </>
  )
}

export default RequestInformation
