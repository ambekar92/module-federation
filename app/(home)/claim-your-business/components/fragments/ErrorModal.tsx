import { Box } from '@mui/material';
import { Alert, Button } from '@trussworks/react-uswds';
import Modal from '@mui/material/Modal';

interface ErrorModalProps {
	open: boolean;
	handleClose: () => void;
	error?: string;
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
  borderRadius: 3
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, handleClose, error }) => {
  if (typeof window === 'undefined') {
    // Avoids rendering modals on the server
    return null;
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
              heading={error === 'already claimed' ? 'This business has already been claimed.' : 'The information you entered does not match SAM.gov.'}
              headingLevel="h4"
            >
              <ul>
                <li>
									If you claimed the business using another email account, please log in using that
									account.
                </li>
                <li>
									If your business has other qualified owners, please ensure that they have not already
									claimed the business. Each business can only be claimed once.
                </li>
                <li>
                  If none of the above are true, you should contact UCP support for further assistance.
                </li>
              </ul>
              <Button type='button' className="float-right" onClick={handleClose}>
                Close
              </Button>
            </Alert>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ErrorModal;
