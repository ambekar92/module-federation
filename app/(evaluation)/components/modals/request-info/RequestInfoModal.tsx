import React from 'react';
import { Modal, ModalHeading, ModalFooter, ButtonGroup, Button, Label } from '@trussworks/react-uswds';
import styles from '../../Evaluation.module.scss';
import { ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes';

interface ReasonState {
  id: number | null;
  title: string;
}

interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: ReasonState;
  setReason: (reason: ReasonState) => void;
  explanation: string;
  setExplanation: (explanation: string) => void;
  reasonCodes: ReasonCode[] | undefined;
  onSave: () => void;
}

const RequestInfoModal: React.FC<RequestInfoModalProps> = ({
  isOpen,
  onClose,
  reason,
  setReason,
  explanation,
  setExplanation,
  reasonCodes,
  onSave
}) => {
  if (!isOpen) {
    return null;
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedReason = reasonCodes?.find(code => code.id === selectedId);
    setReason({
      id: selectedId,
      title: selectedReason?.title || ''
    });
  };

  return (
    <Modal
      id="request-info-modal"
      forceAction
      aria-labelledby="request-info-modal"
      aria-describedby="request-info-modal"
      isLarge
      isInitiallyOpen
      renderToPortal={false}
    >
      <ModalHeading>Edit This Request for Information</ModalHeading>
      <div>
        <Label htmlFor='reason-code' requiredMarker className={`${styles['field-title']}`}>What&apos;s your reason?</Label>
        <div className="usa-combo-box margin-top-05">
          <select
            className={`usa-select ${styles['dropdown-text']}`}
            name="reason-code"
            id="reason-code"
            value={reason.id || ''}
            onChange={handleReasonChange}
          >
            <option value="">Select Reason</option>
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
      <ModalFooter>
        <ButtonGroup>
          <Button type="button" onClick={onSave}>
            Save
          </Button>
          <Button className="usa-button--outline" type="button" onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
}

export default RequestInfoModal;
