import { ENTITY_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { fetcherPOST } from '@/app/services/fetcher-legacy'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { Button, ButtonGroup, Icon } from '@trussworks/react-uswds'
import React from 'react'
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
  setErrorMsg: (msg: string) => void;
	setPostSuccessful: (success: boolean) => void;
	setApplicationId: (id: number) => void;
}

// Only way to style the box component
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
  setPostSuccessful, setApplicationId
}) => {
  const session = useSessionUCMS();
  const user_id = session?.data?.user_id;

  const handlePostRequest = async () => {
    try {
      const postData = [{
        owner_user_id: user_id,
        sam_entity_id: business.sam_entity.sam_entity_id
      }];
      const res = await fetcherPOST<IPostResponse[]>(`${ENTITY_ROUTE}`, postData);

      if(res) {
        setApplicationId(res[0].id)
        setPostSuccessful(true);
      	handleClose();
      } else {
        throw 'POST Request Failed'
      }
    } catch (error: any) {
      setErrorMsg('network error');
      setPostSuccessful(false);
      handleOpen();
      return;
    }
  }

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
								You are confirming that the structure of <strong>{business.sam_entity.legal_business_name}</strong> is a <strong>{business.sam_entity_structure}</strong>
              </li>
            </ul>

            <p>
							If this designation is incorrect, please update your information on SAM.gov immediately.
            </p>
            <ButtonGroup>
              <Button type="button" onClick={handlePostRequest}>
								Continue
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
