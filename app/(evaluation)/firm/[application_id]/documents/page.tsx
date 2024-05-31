import React from 'react'
import LeftPanel from '../../../components/LeftPanel'
import Documents from '../../../components/documents/Documents'

const DocumentsMain = () => {
  return (
    <>
      <div className='grid-row'>
        <div className="grid-col-3 bg-white">
          <LeftPanel status="Documents"/>
        </div>

        <div className="grid-col-9">
          <Documents />
        </div>
      </div>
    </>
  )
}

export default DocumentsMain
