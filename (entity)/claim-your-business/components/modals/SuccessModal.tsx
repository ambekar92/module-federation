import { Box } from '@mui/material'
import { Alert, Button } from '@trussworks/react-uswds'
import Modal from '@mui/material/Modal'
import React from 'react'

interface SuccessModalProps {
  open: boolean
  handleClose: () => void
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
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, handleClose }) => {
  if (typeof window === 'undefined') {
    // Avoids rendering modals on the server
    return null
  }
  const headingMsg = 'Business has been claimed'

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyles}>
        <div>
          <Alert
            role="alert"
            className="wide"
            type="success"
            heading={headingMsg}
            headingLevel="h4"
          >
            <ul>
              <li>Business has been claimed successfully!</li>
            </ul>
            <Button type="button" className="float-right" onClick={handleClose}>
              Close
            </Button>
          </Alert>
        </div>
      </Box>
    </Modal>
  )
}

export default SuccessModal
