import React from 'react'
import LeftPanel from '../../../../components/LeftPanel'
import RightPanel from '../../../../components/RightPanel'

const EvaluationPage = () => {
  return (
    <>
      <div className="grid-row bg-gray-5">
        <div className="grid-col-3 bg-white">
          <LeftPanel status="Notes" />
        </div>

        <div className="grid-col-5"></div>

        <div className="grid-col-4 bg-white">
          <RightPanel />
        </div>
      </div>
    </>
  )
}

export default EvaluationPage
