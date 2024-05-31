import React, { useState, useEffect } from 'react'
import MenuData from './utils/menuData.json'
import { Link } from '@trussworks/react-uswds'

function LeftPanel(props) {
  return (
    <>
      <div className="grid-container margin-top-2">
        <h2 className="margin-top-0">Stark Tech, LLC</h2>
        <div className="margin-top-1">
          {' '}
          <span className="text-bold margin-right-1">UEI</span>{' '}
          <span>9H79234245</span>{' '}
        </div>
        <div className="margin-top-1">
          {' '}
          <span className="text-bold margin-right-1">Certification</span>{' '}
          <span>MPP</span>{' '}
        </div>
        <div className="margin-top-1 margin-bottom-3">
          {' '}
          <span className="usa-tag margin-top-2"> Entity Owned</span>
        </div>
        <div className="usa-combo-box margin-bottom-4">
          <select
            className="usa-select"
            name="sort"
            id="sort"
            data-placeholder="sort"
          >
            <option>Actions</option>
          </select>
        </div>
      </div>
      <div className="grid-container">
        <nav aria-label="Side navigation">
          <ul className="usa-sidenav">
            {MenuData.data.map((item, index) => {
              if (item.child.length > 0) {
                return (
                  <div key={index}>
                    <li className="usa-sidenav__item">
                      {
                        item.name === props.status ?
                        <Link className="usa-current">
                        {item.name}
                        </Link>
                        : 
                        <Link>
                        {item.name}
                        </Link>
                      }
                      <ul className="usa-sidenav__sublist">
                        {item.child.map((childItem, index1) => {
                          return (
                            <div key={index1}>
                              <li className="usa-sidenav__item">
                                <Link>
                                  {childItem.name}
                                </Link>
                              </li>
                            </div>
                          )
                        })}
                      </ul>
                    </li>
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <li className="usa-sidenav__item">
                      {
                        item.name === props.status ?
                        <Link className="usa-current">
                        {item.name}
                        </Link>
                        : 
                        <Link>
                        {item.name}
                        </Link>
                      }
                    </li>
                  </div>
                )
              }
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default LeftPanel
