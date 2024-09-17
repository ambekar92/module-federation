'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems'
import {
  Button,
  ButtonGroup,
  DateInput,
  DateInputGroup,
  Fieldset,
  FormGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  Select,
  TextInput
} from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { RefObject, useState, useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'
import styles from '../RtfRfi.module.scss'
import axios from 'axios'
import { SUBMIT_RFI_ROUTE } from '@/app/constants/local-routes'

interface EditFormModalProps {
  tableData: IRTFItems[];
  reasonCodeMap: Record<number, string>;
  modalRef: RefObject<ModalRef>;
  applicationId: string;
  mutateDraft: () => void;
  mutateRequest: () => void;
}

const FinalizeRequestForInformation: React.FC<EditFormModalProps> = ({
  tableData,
  reasonCodeMap,
  modalRef,
  applicationId,
  mutateDraft,
  mutateRequest
}) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>();
  const [dueDate, setDueDate] = useState({ month: '', day: '', year: '' });
  const [subject, setSubject] = useState('');

  function onClose() {
    modalRef.current?.toggleModal();
  }

  const handleDateChange = (unit: 'month' | 'day' | 'year', value: string) => {
    setDueDate(prevDate => ({ ...prevDate, [unit]: value }));
  };

  const formatDueDate = () => {
    if (dueDate.month && dueDate.day && dueDate.year) {
      const date = new Date(parseInt(dueDate.year), parseInt(dueDate.month) - 1, parseInt(dueDate.day));
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const contentComponents = useMemo(() => {
    const issuesList = (tableData && tableData.length > 0) && tableData.map((item: IRTFItems, index: number) => (
      <div className='margin-bottom-3' key={index}>
        <p className='margin-bottom-1'>{reasonCodeMap[item.reason.id] || 'Unknown Reason'}</p>
        {item.explanation && <p className='margin-y-0'>{item.explanation}</p>}
      </div>
    ));

    const additionalInfo = (
      <p>
        If you have questions, please contact {sessionData.data?.user.name} at 636-555-3226 or our main help desk at 317-555-0113.
      </p>
    );

    return { issuesList, additionalInfo };
  }, [tableData, reasonCodeMap, sessionData]);

  const generateHTMLContent = () => {
    return `
      <p>Subject: ${subject}</p>
      <p>
        Additional information is required to complete the review of your MySBA Certification application #${params.application_id}.
        Please provide the following information by ${formatDueDate()} to avoid any further delays in processing your application:
      </p>
      <h4>List of Issues</h4>
      ${ReactDOMServer.renderToString(<>{contentComponents.issuesList}</>)}
      ${ReactDOMServer.renderToString(contentComponents.additionalInfo)}
    `;
  };

  const handleReturnApp = async () => {
    try {
      const requestData = {
        application_id: parseInt(applicationId),
        due_date: formatDueDate(),
        author_id: sessionData.data?.user_id,
        message: generateHTMLContent()
      }

      await axios.post(SUBMIT_RFI_ROUTE, requestData);
      mutateDraft();
      mutateRequest();
    } catch(error) {
      // Error handled lol -KJ
    }

    onClose()
  }

  return (
    <Modal
      forceAction
      aria-labelledby="finalize-rfi-modal"
      aria-describedby="finalize-rfi-modal"
      ref={modalRef}
      id="finalize-rfi-modal"
      renderToPortal={false}
      isLarge
    >
      <ModalHeading id="finalize-rfi-modal-heading" className="full-width">
        <Label htmlFor="finalize-rtf-modal" className="text-bold">
          <h3>
            Finalize Request for Information
          </h3>
        </Label>
      </ModalHeading>

      <div className={styles['modalBody']}>
        <Fieldset legend="Due Date">
          <span className="usa-hint" id="dueDateHint">
            For example: 1 15 2025
          </span>
          <DateInputGroup>
            <FormGroup className="usa-form-group--month usa-form-group--select">
              <Label htmlFor="rfi-input-select">Month</Label>
              <Select
                id="dueDateMonth"
                name="dueDateMonth"
                value={dueDate.month}
                onChange={(e) => handleDateChange('month', e.target.value)}
              >
                <option>- Select -</option>
                <option value="1">01 - January</option>
                <option value="2">02 - February</option>
                <option value="3">03 - March</option>
                <option value="4">04 - April</option>
                <option value="5">05 - May</option>
                <option value="6">06 - June</option>
                <option value="7">07 - July</option>
                <option value="8">08 - August</option>
                <option value="9">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </Select>
            </FormGroup>
            <DateInput
              id="dueDateDay"
              name="dueDateDay"
              label="Day"
              unit="day"
              maxLength={2}
              minLength={2}
              value={dueDate.day}
              onChange={(e) => handleDateChange('day', e.target.value)}
            />
            <DateInput
              id="dueDateYear"
              name="dueDateYear"
              label="Year"
              unit="year"
              maxLength={4}
              minLength={4}
              value={dueDate.year}
              onChange={(e) => handleDateChange('year', e.target.value)}
            />
          </DateInputGroup>
        </Fieldset>
        <div>
          <Label htmlFor="session-modal">Subject</Label>
          <TextInput
            id="subject"
            name="subject"
            type="text"
            className={styles['maxWidth']}
            placeholder="Stark Tech, LLC - Request for Information - 07/22/2024"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </div>

        <div>
          <p>
            Additional information is required to complete the review of your MySBA Certification application #{params.application_id}.
            Please provide the following information by {formatDueDate()} to avoid any further delays in processing your application:
          </p>
        </div>

        <div>
          <h4>List of Issues</h4>
          {contentComponents.issuesList}
        </div>

        <div>
          {contentComponents.additionalInfo}
        </div>
      </div>

      <ModalFooter>
        <ButtonGroup className="float-left">
          <Button
            type="button"
            className="float-left usa-button"
            disabled={!subject || !dueDate.day || !dueDate.month || !dueDate.year}
            onClick={handleReturnApp}
          >
            Send Request for Information
          </Button>
          <span
            className={`${styles['actionButton']}`}
            onClick={onClose}
          >
            Cancel
          </span>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )
}

export default FinalizeRequestForInformation
