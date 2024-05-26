import React, { useState, useEffect } from 'react'

function HeaderPanel() {
  return (
    <>
      <div className="grid-container margin-top-2">
        <h1 className="margin-top-0">Stark Tech, LLC</h1>

        <div className="grid-row margin-bottom-4">
          <div className="grid-col-3">
            <p className="margin-0 text-bold">Address</p>
            <div className="margin-top-1">
              <span>
                1234 this street
                <br />
                cityname, ST 12345
              </span>
            </div>
          </div>
          <div className="grid-col-2">
            <p className="margin-0 text-bold">Business type</p>
            <div className="margin-top-1">
              <span>LLC</span>
            </div>
          </div>
          <div className="grid-col-2">
            <p className="margin-0 text-bold">Status</p>
            <div className="margin-top-1">
              <span>Not Started</span>
            </div>
          </div>
          <div className="grid-col-3">
            <p className="margin-0 text-bold">Exclusion Status</p>
            <div className="margin-top-1">
              <span>yes</span>
            </div>
          </div>
          <div className="grid-col-2">
            <p className="margin-0 text-bold">lorem ipsum</p>
            <div className="margin-top-1">
              <span>lorem ipsum</span>
            </div>
          </div>
        </div>
        <div
          className="usa-step-indicator usa-step-indicator--counters-sm bg-gray-5"
          aria-label="progress"
        >
          <ol className="usa-step-indicator__segments">
            <li className="usa-step-indicator__segment usa-step-indicator__segment--complete">
              <span className="usa-step-indicator__segment-label font-ui-2xs">
                Screening<span className="usa-sr-only">completed</span>
              </span>
            </li>
            <li
              className="usa-step-indicator__segment usa-step-indicator__segment--current"
              aria-current="true"
            >
              <span className="usa-step-indicator__segment-label">
                Analysis L1
              </span>
            </li>
            <li className="usa-step-indicator__segment">
              <span className="usa-step-indicator__segment-label font-ui-2xs">
                Analysis L2 <span className="usa-sr-only">not completed</span>
              </span>
            </li>
            <li className="usa-step-indicator__segment">
              <span className="usa-step-indicator__segment-label font-ui-2xs">
                Third Party <br /> review - OGC{' '}
                <span className="usa-sr-only">not completed</span>
              </span>
            </li>
            <li className="usa-step-indicator__segment">
              <span className="usa-step-indicator__segment-label font-ui-2xs">
                Third Party <br />
                review - OCE <span className="usa-sr-only">not completed</span>
              </span>
            </li>
            <li className="usa-step-indicator__segment">
              <span className="usa-step-indicator__segment-label font-ui-2xs">
                Final Review Supervisor/Director{' '}
                <span className="usa-sr-only">not completed</span>
              </span>
            </li>
            <span className="usa-step-indicator__segment-label font-ui-2xs"></span>
          </ol>
        </div>
      </div>
    </>
  )
}

export default HeaderPanel