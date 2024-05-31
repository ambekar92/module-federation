import React from 'react'
import LeftPanel from '../components/LeftPanel'
import HeaderPanel from '../components/HeaderPanel'
import MainAppPanel from '../components/MainAppPanel'

const EvaluationPage = () => {
  return (
    <>
      <div className='grid-row bg-gray-5'>
        <div className="grid-col-3 bg-white">
          <LeftPanel status="Application"/>
        </div>

        <div className="grid-col-9">
          <HeaderPanel />
          <MainAppPanel />
        </div>
      </div>
    </>
  )
}

export default EvaluationPage
