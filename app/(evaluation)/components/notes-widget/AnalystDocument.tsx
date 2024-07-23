import React from 'react'
import styles from '../Evaluation.module.scss'

function AnalystDocument() {
  return (
    <>
      <div className="margin-top-2">

          <div className='grid-row'>
            <div className="grid-col-5">
              <p className={`${styles['textbox-content']}`}> Analyst templates?</p>
            </div>

            <div className="grid-col-5">
            <p className={`${styles['textbox-content']}`}> Policy Documents?</p>
            </div>
          </div>

      </div>
    </>
  )
}

export default AnalystDocument
