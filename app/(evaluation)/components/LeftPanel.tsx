'use client'
import React, { useState, useEffect, act } from 'react'
import MenuData from './utils/menuData.json'
import ActionMenuData from './utils/actionMenuData.json'
import { Link } from '@trussworks/react-uswds'
import ActionMenuModal from '../../shared/components/modals/ActionMenuModal'
import { errorToJSON } from 'next/dist/server/render'
import InviteModal from '@/app/(entity)/add-delegate/components/fragments/InviteModal'
import Notes from './reviews/Notes'

function LeftPanel(props) {
  const [showModal, setShowModal] = useState(false)
  const [actionModalProps, setActionModalProps] = useState({
    title: '',
    actionLabel: '',
    modalType: 'default',
    description: '',
    steps: [],
    id: 0,
    table: {
      step: -1,
      tableHeader: [],
      tableRows: [],
    },
    signature: {
      step: -1,
      description: '',
    },
    upload: false,
    uploadStep: -1,
    notes: {
      step: -1,
      rows: [],
    },
    approvalLetter: {
      step: -1,
      rows: [],
    },
  })

  const handleAction = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleActionSelect = (e: Event) => {
    /*eslint-disable eqeqeq*/
    const modalProp = ActionMenuData.data.find(
      (item) => item.id == e.target?.value,
    )

    if (modalProp) {
      setActionModalProps({
        title: modalProp?.title || '',
        actionLabel: modalProp?.actionLabel || '',
        modalType: modalProp?.modalType || 'default',
        description: modalProp?.description || '',
        steps: modalProp?.steps || [],
        id: modalProp?.id,
        table: {
          step: modalProp?.table?.step,
          tableHeader: modalProp?.table?.tableHeader || [],
          tableRows: modalProp?.table?.tableRows || [],
        },
        signature: {
          step: modalProp?.signature?.step,
          description: modalProp?.signature?.description || '',
        },
        upload: modalProp?.upload,
        uploadStep: modalProp?.uploadStep,
        notes: {
          step: modalProp?.notes.step,
          rows: modalProp?.notes.rows || [],
        },
        approvalLetter: {
          step: modalProp?.approvalLetter.step,
          rows: modalProp?.approvalLetter.rows || [],
        },
      })
      setShowModal(true)
    }
  }

  return (
    <>
      <ActionMenuModal
        open={showModal}
        title={actionModalProps.title}
        actionLabel={actionModalProps.actionLabel}
        modalType={actionModalProps.modalType}
        description={actionModalProps.description}
        steps={actionModalProps.steps}
        id={actionModalProps.id}
        table={actionModalProps.table}
        tableRows={actionModalProps.tableRows}
        signature={actionModalProps.signature}
        upload={actionModalProps.upload}
        uploadStep={actionModalProps.uploadStep}
        notes={actionModalProps.notes}
        approvalLetter={actionModalProps.approvalLetter}
        handleAction={handleAction}
        handleCancel={handleCancel}
      />
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
            onChange={(e) => {
              handleActionSelect(e)
            }}
          >
            <option>Actions</option>
            {ActionMenuData.data.map((item, index) => {
              return (
                <option key={`action-menu-option-${index}`} value={item.id}>
                  {item.optionLabel}
                </option>
              )
            })}
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
                      {item.name === props.status ? (
                        <Link className="usa-current">{item.name}</Link>
                      ) : (
                        <Link>{item.name}</Link>
                      )}
                      <ul className="usa-sidenav__sublist">
                        {item.child.map((childItem, index1) => {
                          return (
                            <div key={index1}>
                              <li className="usa-sidenav__item">
                                <Link>{childItem.name}</Link>
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
                      {item.name === props.status ? (
                        <Link className="usa-current">{item.name}</Link>
                      ) : (
                        <Link>{item.name}</Link>
                      )}
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
