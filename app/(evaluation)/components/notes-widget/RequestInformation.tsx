import React from 'react'
import styles from '../Evaluation.module.scss'
import { Checkbox } from '@trussworks/react-uswds'
import useSWR from 'swr'
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'
import { fetcherGET } from '@/app/services/fetcher-legacy'

function RequestInformation() {
  const { data: reasonCodes, error } = useSWR(REASON_CODE_ROUTE, fetcherGET<ReasonCode[] | []>);

  if(error) {
    console.error(error);
  }

  return (
    <>
      <div className="margin-top-2">
        <p className={`${styles['text']}`}>Ownership & Management</p>
        <p className='margin-top-0 text-bold'>Request Information</p>
        <p className={`${styles['subtext']}`}>
					Use this form for simple requests for information and/or documents from the firm.
          The firms responses will be attached to the relative section.
        </p>

        <div>
          <p className={`${styles['field-title']}`}>What&apos;s your reason? *</p>
          <div className="usa-combo-box">
            <select
              className={`usa-select ${styles['dropdown-text']}`}
              name="type"
              id="type"
              data-placeholder="sort"
            >
              <option defaultChecked>---</option>
              {reasonCodes && reasonCodes.map(code => (
                <option value={code.action_type} key={code.id}>{code.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='margin-top-4'>
          <p className={`${styles['field-title']}`}>Description field for Analyst text</p>
          <textarea
            className={`${styles['textarea-field']}`}
            id="input-type-textarea"
            name="input-type-textarea"
          ></textarea>
          <p className={`${styles['field-title-textarea']}`}>Select &quot;Boilerplate&quot; Information</p>
        </div>

        <div className='margin-top-4'>
          <p className={`${styles['field-title']}`}>Type of response required from the firm:</p>
          <Checkbox id="text" name="text" label="Text" />
          <Checkbox id="attachment" name="attachment" label="Attachment/Document" />
        </div>

        <div className='margin-top-4'>
          <p className={`${styles['field-title']}`}>Attach a document for the vendor (optional):</p>
          <div className={`${styles['file-upload']}`}>
            <input type="file"></input>
          </div>
        </div>

        <div className='grid-row margin-top-6'>
          <div className="grid-col-6">
            <button className="usa-button usa-button--outline" type="button">Cancel</button>
          </div>

          <div className={`grid-col-6 ${styles['button-align']}`}>
            <button className="usa-button usa-button--active " type="button">Create Request</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default RequestInformation
