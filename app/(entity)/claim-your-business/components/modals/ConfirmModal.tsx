import { CLAIM_ENTITY_ROUTE } from '@/app/constants/local-routes'
import { buildRoute, SELECT_INTENDED_PROGRAMS_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { Button, ButtonGroup, Icon } from '@trussworks/react-uswds'
import axios from 'axios'
import React, { useState } from 'react'
import { CmbResponseType } from '../../utils/types'

interface IPostResponse {
  id: number;
  sam_entity_id: number;
  owner_user_id: number;
}

interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  business: CmbResponseType;
  setErrorMsg: (errorMsg: string) => void;
  setPostSuccessful: (isSuccess: boolean) => void;
  setEntityId: (id: number) => void;
}

const boxStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'auto',
  borderRadius: 3,
  backgroundColor: 'white',
  width: '480px',
  padding: '1rem 2rem'
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  business, open, handleClose, handleOpen, setErrorMsg,
  setPostSuccessful, setEntityId
}) => {
  const session = useSessionUCMS();
  const user_id = session?.data?.user_id;
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentEntityIndex, setCurrentEntityIndex] = useState(0);
  const [firstEntityId, setFirstEntityId] = useState<number | null>(null);

  const handlePostRequest = async () => {
    setIsProcessing(true);
    try {
      const currentEntity = business.sam_entity[currentEntityIndex];
      const postData = [{
        owner_user_id: user_id,
        sam_entity_id: currentEntity.sam_entity_id
      }];
      const response = await axios.post(CLAIM_ENTITY_ROUTE, postData);

      if (response.status === 200 && response.data) {
        const res: IPostResponse[] = response.data;
        if (currentEntityIndex === 0) {
          setFirstEntityId(res[0].id);
        }
        setEntityId(res[0].id);
        if (currentEntityIndex < business.sam_entity.length - 1) {
          setCurrentEntityIndex(currentEntityIndex + 1);
        } else {
          setPostSuccessful(true);
          handleClose();
          if (firstEntityId !== null) {
            window.location.href = buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, {entity_id: firstEntityId});
          }
        }
      } else {
        throw new Error('POST Request Failed');
      }
    } catch (error: any) {
      setErrorMsg('network error');
      setPostSuccessful(false);
      handleOpen();
    } finally {
      setIsProcessing(false);
    }
  }

  const currentEntity = business.sam_entity[currentEntityIndex];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyles}>
          <div className='display-flex flex-justify-end width-full'>
            <Button onClick={handleClose} type='button' unstyled>
              <Icon.Close className='text-ink height-3 width-3'/>
            </Button>
          </div>
          <div>
            <h2 className='margin-top-0'>Confirm your Business and Entity Structure</h2>
            <ul className='padding-left-2'>
              <li>
                You are confirming that the structure of <strong>{currentEntity.legal_business_name}</strong> is a <strong>{business.sam_entity_structure}</strong>
              </li>
            </ul>
            <p>
              If this designation is incorrect, please update your information on SAM.gov immediately.
            </p>
            <ButtonGroup>
              <Button type="button" onClick={handlePostRequest} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : (currentEntityIndex < business.sam_entity.length - 1 ? 'Continue' : 'Finish')}
              </Button>
              <div className='width-1'></div>
              <Button type="button" unstyled className="text-underline" onClick={handleClose}>
                Go Back
              </Button>
            </ButtonGroup>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ConfirmModal
