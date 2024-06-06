import React, { useState, useEffect } from 'react'
import styles from '../Evaluation.module.scss'
import { Checkbox } from '@trussworks/react-uswds'

function RequestInformation() {
  return (
    <>
      <div className="margin-top-2">
        <p className={`${styles['text']}`}>Ownership & Management</p>
        <p className='margin-top-0 text-bold'>RequestInformation</p>
        <p className={`${styles['subtext']}`}>use this form for simple requests for information and/or documents from the firm.
          The firms responses will be attached to the relative section.
        </p>

        <div>
          <p className={`${styles['field-title']}`}>What's your reason? *</p>
          <div className="usa-combo-box">
            <select
              className={`usa-select ${styles['dropdown-text']}`}
              name="type"
              id="type"
              data-placeholder="sort"
            >
              <option>Pre determined selection of stuffs :-)</option>
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
          <p className={`${styles['field-title-textarea']}`}>Select "Boilerplate" Information</p>
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
