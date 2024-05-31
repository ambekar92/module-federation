import React from 'react'
import LeftPanel from '../../../components/LeftPanel'
import FirmSummary from '../../../components/firm-summary/FirmSummary'

const FirmSummaryMain = () => {
  return (
    <>
      <div className='grid-row'>
        <div className="grid-col-3 bg-white">
          <LeftPanel status="Firm Summary"/>
        </div>

        <div className="grid-col-9">
          <FirmSummary />
        </div>
      </div>
    </>
  )
}

export default FirmSummaryMain
