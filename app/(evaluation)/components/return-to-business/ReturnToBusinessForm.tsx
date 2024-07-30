'use client'

import { RTF_ITEMS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'
import Close from '@mui/icons-material/Close'
import { Alert, Button, ButtonGroup, Label } from '@trussworks/react-uswds'
import { useState } from 'react'
import { useApplicationData } from '../../firm/useApplicationData'
import styles from '../Evaluation.module.scss'
import DeleteConfirmationModal from '../modals/request-info/DeleteConfirmationModal'
import RequestInfoModal from '../modals/request-info/RequestInfoModal'
import { useParams } from 'next/navigation'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import useFetchOnce from '@/app/shared/hooks/useFetchOnce'

export interface ReasonState {
  id: number | null;
  title: string;
}

function ReturnToBusinessForm() {
  const params = useParams<{application_id: string}>();
  const {applicationData} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const sessionData = useSessionUCMS()
  const { data: reasonCodes, error } = useFetchOnce<ReasonCode[]>(REASON_CODE_ROUTE, fetcher)
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<ReasonState>({ id: null, title: '' });
  const [explanation, setExplanation] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('RTB Created');

  const handlePostRequest = async () => {
    try {
      const requestData = {
        application_id: applicationData?.id,
        author_id: sessionData.data?.user_id,
        explanation,
        reason_id: reason.id,
        reason: reason.title
      };

      const response = await axiosInstance.post(RTF_ITEMS_ROUTE, requestData);

      setPostSuccess(true);
      setDisplayAlert(true);
      setIsModalOpen(false);
      setAlertMessage('RTB Created');

      if (response.data) {
        setReason({
          id: response.data.reason_id,
          title: response.data.reason
        });
        setExplanation(response.data.explanation);
      }

    } catch (error: any) {
      setPostSuccess(false);
    }
  }

  const handleClear = () => {
    setReason({ id: null, title: '' });
    setExplanation('');
    setPostSuccess(false);
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
      await axiosInstance.delete(`${RTF_ITEMS_ROUTE}?id=${reason.id}&author_id=${sessionData.data?.user_id}`);
      setIsDeleteModalOpen(false);
      handleClear();
      setDisplayAlert(true);
      setAlertMessage('RTB Deleted');
    } catch (error: any) {
      setIsDeleteModalOpen(false);
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
              disabled={error}
              value={reason.id || ''}
              onChange={(e) => setReason({
                id: Number(e.target.value),
                title: reasonCodes?.find(code => code.id === Number(e.target.value))?.title || ''
              })}
            >
              <option value="">{error ? 'Error loading...': 'Select Reason'}</option>
              {reasonCodes && reasonCodes.map(code => (
                <option value={code.id} key={code.id}>{code.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='margin-top-4'>
          <Label htmlFor='description-analyst' className={`${styles['field-title']}`}>Description (Optional)</Label>
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
            <Button type="button" disabled={error} onClick={handlePostRequest}>
              {postSuccess ? 'Update' : 'Create'}
            </Button>
          </div>
        </ButtonGroup>

        {postSuccess && (
          <ButtonGroup className='display-flex flex-justify margin-top-3'>
            <Button type='button' className={`${styles['field-title']}`} unstyled onClick={handleOpenModal}>Highest Compensated</Button>
            <Button type='button' className={`${styles['field-title']}`} unstyled onClick={handleOpenDeleteModal}>Delete</Button>
          </ButtonGroup>
        )}

        {displayAlert && (
          <Alert
            type='success'
            headingLevel='h6'
            heading='Success.'
            className={`${styles['alert-text']}`}
            slim
          >
            {''} {alertMessage}.
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

export default ReturnToBusinessForm
