import React from 'react'
import LeftPanel from '../../../../components/LeftPanel'
import HeaderPanel from '../../../../components/HeaderPanel'
import MainAppPanel from '../../../../components/MainAppPanel'

const EvaluationPage = async ({
  params: { application_id },
}: {
  params: { application_id: string }
}) => {
  return (
    <>
      <div className="grid-row bg-gray-5">
        <div className="grid-col-3 bg-white">
          <LeftPanel status="Application" />
        </div>

        <div className="grid-col-9">
          <HeaderPanel />
          <MainAppPanel application_id={application_id} />
        </div>
      </div>
    </>
  )
}

export default EvaluationPage
