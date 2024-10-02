import { Box } from '@mui/material'
import { Alert, Button } from '@trussworks/react-uswds'
import Modal from '@mui/material/Modal'
import React from 'react'

interface ErrorModalProps {
  open: boolean
  handleClose: () => void
  error?: string
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

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  handleClose,
  error,
}) => {
  if (typeof window === 'undefined') {
    // Avoids rendering modals on the server
    return null
  }
  let headingMsg

  if (error === 'already claimed') {
    headingMsg = 'This business has already been claimed.'
  } else if (error === 'not found') {
    headingMsg = 'The information you entered does not match SAM.gov.'
  } else if(error === 'early access') {
    headingMsg = 'Thank you for your interest!'
  } else if(error === 'cannot create entity') {
    headingMsg = 'Please Logout and Login again.'
  } else if(error === 'wrong structure') {
    headingMsg = 'Cannot Claim this Business'
  } else {
    headingMsg =
      'Uh-oh! Looks like something broke on our side. If you need immediate assistance, please contact our support team at 1-202-205-6459'
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyles}>
        {error && (
          <div>
            <Alert
              role="alert"
              className="wide"
              type="error"
              heading={headingMsg}
              headingLevel="h4"
            >
							 {error === 'early access'
                ? (
                  <>
                    <p>It looks like you don’t have early access. Please return to MySBA Certifications on October to submit your application.</p>
                    <p>We appreciate your patience and understanding.</p>
                  </>
                )
                : error === 'wrong structure' ? (
                  <>
                    <p>Your business type is not supported by any SBA Certification programs.  For more information about the basic requirements, please visit <a href="https://www.sba.gov/federal-contracting/contracting-guide/basic-requirements">Basic Requirements</a>.</p>
                  </>
                ): <ul className='padding-left-1'>
                  <li>
											If you claimed the business using another email account, please log in using that account.
                  </li>
                  <li>
											If your business has other qualifying owners, please ensure
											that they have not already claimed the business. Each business
											can only be claimed once.
                  </li>
                  <li>
										If none of the above are true, you should contact UCP support
										for further assistance.
                  </li>
                </ul>
              }
              <Button
                type="button"
                className="float-right"
                onClick={handleClose}
              >
                Close
              </Button>
            </Alert>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default ErrorModal
