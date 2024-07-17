'use client'
import { APPLICATION_NOTES_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import styles from '../Evaluation.module.scss'

function Notes() {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('');
  const params = useParams();

  const handlePostRequest = async () => {
    try {
      const postData = {
        application_id: params.application_id,
        subject: subject,
        description: description,
      }

      await fetcherPOST(`${APPLICATION_NOTES_ROUTE}`, postData)
    } catch (error: any) {
      console.error('Network Error: ', error)
      return
    }
  }

  const handleSubjectChange = (value: string) => {
    setSubject(value)
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
  }

  return (
    <>
      <div className="margin-top-2">
        <p className={`${styles['text']}`}></p>
        <p className="margin-top-0 text-bold">Notes</p>
        <p className={`${styles['subtext']}`}>
          use this form for simple requests for information and/or documents
          from the firm. The firms responses will be attached to the relative
          section.
        </p>

        <div>
          <p className={`${styles['field-title']}`}>Subject Field *</p>
          <p className={`${styles['text']}`}>
            This is a text input with a character counter.
          </p>
          <input
            className={`${styles['text-field']}`}
            id="input-type-text"
            name="input-type-text"
            onChange={(e) => {
              handleSubjectChange(e.target.value)
            }}
          />
        </div>

        <div className="margin-top-4">
          <p className={`${styles['field-title']}`}>
            Description field for Analyst text
          </p>
          <textarea
            className={`${styles['textarea-field']}`}
            id="input-type-textarea"
            name="input-type-textarea"
            onChange={(e) => {
              handleDescriptionChange(e.target.value)
            }}
          ></textarea>

          <div className="grid-row margin-top-4">
            <div className="grid-col-6">
              <button className="usa-button usa-button--outline" type="button">
                Cancel
              </button>
            </div>

            <div className={`grid-col-6 ${styles['button-align']}`}>
              <button
                className="usa-button usa-button--active "
                type="button"
                onClick={handlePostRequest}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes
