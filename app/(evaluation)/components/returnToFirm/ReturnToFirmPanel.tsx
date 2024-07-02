import React, { useState, useEffect } from 'react'
import ReturnToFirmDataTable from './ReturnToFirmDataTable'

function ReturnToFirmPanel() {
  return (
    <div className='grid-container'>
      <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
        <div className="usa-card__container">
          <div className="usa-card__header">
            <h3 className="usa-card__heading">
              Return to Firm
            </h3>
          </div>
          <div>
            <div className="usa-card__body">              
              <ReturnToFirmDataTable />
            </div>
          </div>
        </div>
      </li>
    </div>
  )
}

export default ReturnToFirmPanel
