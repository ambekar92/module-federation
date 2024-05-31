import React, { useState, useEffect } from 'react'
import styles from './Evaluation.module.scss'

function RightPanelContent() {
  return (
    <>
      <div className="margin-top-2">
        <p className={`${styles['text']}`}></p>
        <p className='margin-top-0 text-bold'>Notes</p>
        <p className={`${styles['subtext']}`}>use this form for simple requests for information and/or documents from the firm.
          The firms responses will be attached to the relative section.
        </p>

        <div>
          <p className={`${styles['field-title']}`}>Subject Field *</p>
          <p className={`${styles['text']}`}>This is a text input with a character counter.</p>
          <input className={`${styles['text-field']}`} id="input-type-text" name="input-type-text" />
        </div>

        <div className='margin-top-4'>
          <p className={`${styles['field-title']}`}>Description field for Analyst text</p>
          <textarea
            className={`${styles['textarea-field']}`}
            id="input-type-textarea"
            name="input-type-textarea"
          ></textarea>

          <div className='grid-row margin-top-4'>
            <div className="grid-col-6">
              <button className="usa-button usa-button--outline" type="button">Cancel</button>
            </div>

            <div className={`grid-col-6 ${styles['button-align']}`}>
              <button className="usa-button usa-button--active " type="button">Add Note</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default RightPanelContent
