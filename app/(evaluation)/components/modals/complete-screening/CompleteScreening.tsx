'use client'

import { UPDATE_APPLICATION_STATE } from '@/app/constants/routes';
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { axiosInstance } from '@/app/services/axiosInstance';
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask';
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'
import React, { RefObject } from 'react'

interface CompleteScreeningProps {
  modalRef: RefObject<ModalRef>;
	processId: number | undefined;
	applicationTier: string | undefined;
	applicationId: number | undefined;
	handleAction: () => void;
}

const CompleteScreening: React.FC<CompleteScreeningProps> = ({ modalRef, processId, applicationTier, applicationId, handleAction }) => {
  const { trigger } = useCompleteEvalTask()
  const sessionData = useSessionUCMS()

  const handleActionSubmit = async () => {
    try {
      const postData = {
        process_id: processId || 1,
        data: {
          approved: true,
          create_return_to_firm_note: false,
          tier: applicationTier || 1,
        },
      }
      await trigger(postData)
      const updateAppStateData = {
        application_id: applicationId,
        state_action: 'review',
        user_id: sessionData.data.user_id,
        subject: 'Updated for review',
        description: 'Updated for review'
      }
      // TODO: Find a better solution to deal with the delay
      await axiosInstance.put(UPDATE_APPLICATION_STATE, updateAppStateData);
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationId }) + '?name=completed-screening'
    } catch (error: any) {
      handleAction();
      // console.error('Network Error: ', error)
      return
    }
  }

  const handleCancel = () => {
    modalRef.current?.toggleModal();
    handleAction();
  }
  return (
    <>
      <Modal
        forceAction
        ref={modalRef}
        aria-labelledby="complete-screening-modal"
        aria-describedby="complete-screening-modal"
        isLarge
        renderToPortal={false}
        id="action-modal"
      >
        <ModalHeading id="complete-screening-modal-heading">
          <Label htmlFor="complete-screening-modal-action">
            <h2 className="text-bold">Complete Screening</h2>
          </Label>
        </ModalHeading>

        <div className='margin-top-4'>
          {'By clicking "Confirm", you are attesting that this application contains all the necessary information and documents to send it forward for further analysis. You can click "Cancel" if you\'d like to continue screening this application.'}
        </div>

        <ModalFooter>
          <ButtonGroup className="float-left">
            <Button
              type="button"
              className="float-left"
              onClick={handleActionSubmit}
            >
                Confirm
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
    </>
  )
}

export default CompleteScreening
