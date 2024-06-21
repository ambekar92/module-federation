import { ENTITY_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'
import { Box } from '@mui/material'
import Modal from '@mui/material/Modal'
import { Button, ButtonGroup, Icon } from '@trussworks/react-uswds'
import { useSession } from 'next-auth/react'
import React from 'react'
import { CmbResponseType } from '../../utils/types'

interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  business: CmbResponseType;
  setErrorMsg: (msg: string) => void;
	setPostSuccessful: (success: boolean) => void;
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

const ConfirmModal: React.FC<ConfirmModalProps> = ({ business, open, handleClose, setErrorMsg, setPostSuccessful }) => {
  const session = useSession();
  const user_id = session?.data?.user_id;

  const handlePostRequest = async () => {
    try {
      const postData = {
        owner_user_id: user_id,
        sam_entity_id: business.sam_entity.sam_entity_id
      };

      await fetcherPOST(`${ENTITY_ROUTE}`, postData);
      setPostSuccessful(true);
    } catch (error: any) {
      setErrorMsg('network error');
      setPostSuccessful(true); // temp fix
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
            <h2 className='margin-top-0'>Confirm Your Entity Structure</h2>
            <p>
              You are confirming that the structure of {business.sam_entity.legal_business_name} is an {business.sam_entity.entity_structure}
            </p>
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
