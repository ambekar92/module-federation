'use client'

import React, { useRef } from 'react'
import { RFI_ITEMS_ROUTE, RTF_ITEMS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'
import Close from '@mui/icons-material/Close'
import { Alert, Button, ButtonGroup, Label, ModalRef } from '@trussworks/react-uswds'
import { useState } from 'react'
import styles from '../../Evaluation.module.scss'
import DeleteConfirmationModal from '../../modals/request-info/DeleteConfirmationModal'
import RequestInfoModal from '../../modals/request-info/RequestInfoModal'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import useFetchOnce from '@/app/shared/hooks/useFetchOnce'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData'
import { NavItem } from '@/app/(evaluation)/types/types'

export interface ReasonState {
  id: number | null;
  title: string;
}

interface RtfRfiFormProps {
	navItems: NavItem[];
}

function RtfRtiForm({ navItems }: RtfRfiFormProps) {
  const params = useParams<{application_id: string, section_questions: any}>();
  const {applicationData} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const selectedSegment = useSelectedLayoutSegment()
  const sessionData = useSessionUCMS()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const { data: reasonCodes, error } = useFetchOnce<ReasonCode[]>(REASON_CODE_ROUTE, fetcher)
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);
  const [reason, setReason] = useState<ReasonState>({ id: null, title: '' });
  const [explanation, setExplanation] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('RTB Created');
  const [lastPostedItem, setLastPostedItem] = useState<{ id: number | null, reason_id: number | null, reason: string, explanation: string } | null>(null);
  const [modalReason, setModalReason] = useState<ReasonState>({ id: null, title: '' });
  const [modalExplanation, setModalExplanation] = useState<string>('');

  const requestInfoModalRef = useRef<ModalRef>(null);
  const deleteConfirmationModalRef = useRef<ModalRef>(null);

  const handlePostRequest = async () => {
    try {
      const segment = params.section_questions ?? selectedSegment;
      const currentSection = navItems.map(nav => nav.child).flat().find(item => item.url.includes(segment))
      const requestData = {
        application_id: applicationData?.id,
        author_id: sessionData.data?.user_id,
        application_section_id: currentSection?.id,
        explanation,
        reason_id: reason.id,
        reason: reason.title
      };

      const response = await axiosInstance.post(userRole === 'screener' ? RTF_ITEMS_ROUTE : RFI_ITEMS_ROUTE, requestData);

      if (response.data) {
        setLastPostedItem({
          id: response.data.id || response.data.application_id,
          reason_id: response.data.reason_id,
          reason: response.data.reason,
          explanation: response.data.explanation
        });
        setPostSuccess(true);
        setDisplayAlert(true);
        setAlertMessage(userRole === 'screener' ? 'RTB Created' : 'RFI Created');
        setReason({ id: null, title: '' });
        setExplanation('');
      }
    } catch (error: any) {
      setPostSuccess(false);
      // Error handled lol -KJ
    }
  }

  const handleUpdateRequest = async () => {
    try {
      const requestData = {
        application_id: applicationData?.id,
        author_id: sessionData.data?.user_id,
        explanation: modalExplanation,
        reason_id: modalReason.id,
        reason: modalReason.title
      };

      const response = await axiosInstance.put(userRole === 'screener' ? RTF_ITEMS_ROUTE : RFI_ITEMS_ROUTE, requestData);

      if (response.data) {
        setLastPostedItem({
          id: response.data.id,
          reason_id: response.data.reason_id,
          reason: response.data.reason,
          explanation: response.data.explanation
        });
        setDisplayAlert(true);
        setAlertMessage(userRole === 'screener' ? 'RTB Updated' : 'RFI Updated');
        requestInfoModalRef.current?.toggleModal();
      }
    } catch (error: any) {
      // Error handled lol -KJ
    }
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`${userRole === 'screener' ? RTF_ITEMS_ROUTE : RFI_ITEMS_ROUTE}?id=${lastPostedItem?.id ?? 1}&author_id=${sessionData.data?.user_id}`);
      deleteConfirmationModalRef.current?.toggleModal();
      setLastPostedItem(null);
      setPostSuccess(false);
      setDisplayAlert(true);
      setAlertMessage('');
    } catch (error: any) {
      deleteConfirmationModalRef.current?.toggleModal();
    // Error handled lol -KJ
    }
  }

  const handleOpenModal = () => {
    if (lastPostedItem) {
      setModalReason({
        id: lastPostedItem.reason_id,
        title: lastPostedItem.reason
      });
      setModalExplanation(lastPostedItem.explanation);
    }
    requestInfoModalRef.current?.toggleModal();
  }

  const handleClear = () => {
    setReason({ id: null, title: '' });
    setExplanation('');
  }

  const handleCloseAlert = () => {
    setDisplayAlert(false);
  }

  const handleOpenDeleteModal = () => {
    deleteConfirmationModalRef.current?.toggleModal();
    return;
  }

  return (
    <>
      <div>
        <div>
          <Label htmlFor='reason-code' requiredMarker className={`${styles['field-title']}`}>{userRole === 'screener' ? 'What\'s your reason?' : 'Reason for Request'}</Label>
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
          <Label htmlFor='description-analyst' requiredMarker={userRole !== 'screener'} className={`${styles['field-title']}`}>Description {userRole === 'screener' && '(Optional)'}</Label>
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
          		Create
            </Button>
          </div>
        </ButtonGroup>

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

      {postSuccess && (
        <div style={{ paddingLeft: 0 }} className='display-flex flex-justify flex-align-end margin-top-3'>
          <Button type='button' className={`${styles['field-title']}`} unstyled onClick={handleOpenModal}>
						Append {reasonCodes?.find(code => code.id === lastPostedItem?.reason_id)?.title || 'Reason'}
          </Button>
          <Button type='button' className={`${styles['field-title']} margin-left-1`} unstyled onClick={handleOpenDeleteModal}>x Delete</Button>
        </div>
      )}

      <RequestInfoModal
        modalRef={requestInfoModalRef}
        userRole={userRole}
        reason={modalReason}
        setReason={setModalReason}
        explanation={modalExplanation}
        setExplanation={setModalExplanation}
        reasonCodes={reasonCodes}
        onSave={handleUpdateRequest}
      />

      <DeleteConfirmationModal
        modalRef={deleteConfirmationModalRef}
        userRole={userRole}
        onDelete={handleDelete}
      />
    </>
  )
}

export default RtfRtiForm
