'use client'

import React from 'react'
import DistrictOfficePortfolioTable from './DistrictOfficePortfolioTable'
import DistrictOfficePortfolioBusinessTable from './DistrictOfficePortfolioBusinessTable'

const DistrictOfficePortfolio = () => {

  return (
    <>
      <p className='margin-bottom-1 text-bold'>My District Office Portfolio</p>
      <h1 className='margin-0'>Welcome, Admin</h1>
      <hr style={{ margin: '2rem 0' }} />

      <DistrictOfficePortfolioTable  />
      <DistrictOfficePortfolioBusinessTable  />

    </>
  )
}

export default DistrictOfficePortfolio
