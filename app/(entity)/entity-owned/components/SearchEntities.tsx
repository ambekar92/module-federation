'use client'
import React, { useState } from 'react'
import Select from 'react-select'
import { Radio, Label, Grid } from '@trussworks/react-uswds'
import {
  controllingEntityTypeOptions,
  controllingEntities,
} from '../utils/helpers'
import AcknowledgementModal from './AcknowledgementModal'

const SearchEntities = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedEntityType, setSelectedEntityType] = useState(null)
  const [showEntityFoundModal, setShowEntityFoundModal] = useState(false)
  const [showEntitySubmissionModal, setShowEntitySubmissionModal] =
    useState(false)
  const selectRef = React.useRef()
  const entityFoundModalHeading = 'New Controlling Entity Submission Request'
  const entitySubmissionModalHeading = 'Controlling Entity Submission Success'

  let controllingEntityOptions = controllingEntities.map((entity: any) => {
    return {
      value: entity.id,
      label: entity.legal_business_name,
      type: entity.type,
    }
  })

  controllingEntityOptions = [
    ...controllingEntityOptions,
    {
      value: 'Not Found',
      label: 'Controlling Entity Not Found',
      type: 'Not Found',
    },
  ]

  const handleRadioChange = (e: any) => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelectedEntityType(e.target.value)
  }

  const handleSelectChange = (selection: any) => {
    setSelectedOption(selection)
    setShowEntityFoundModal(true)
  }

  const handleEntityFound = () => {
    setShowEntityFoundModal(false)
    setShowEntitySubmissionModal(true)
  }

  const handleEntitySubmit = () => {
    setShowEntitySubmissionModal(false)
  }

  return (
    <>
      <h2>Find Controlling Entity</h2>
      <p>
        From the the list below please select the Controlling Entity Type,
        followed by the Controlling Entity name.
      </p>
      <Label className="text-bold" htmlFor="input-radio-question">
        Controlling Entity Type Selection
      </Label>
      {controllingEntityTypeOptions.map((option: any, index: number) => {
        return (
          <Radio
            key={index}
            id={`input-radio-entity-type-${index}`}
            name="input-radio-entity-type"
            onChange={handleRadioChange}
            label={option.label}
            value={option.value}
          />
        )
      })}

      <Label
        className="text-bold padding-bottom-1"
        htmlFor="input-radio-question"
      >
        Controlling Entity Search
      </Label>
      <Grid col={6}>
        <Select
          id="ControllingEntitySearchSelect"
          openMenuOnFocus={true}
          ref={selectRef}
          value={selectedOption}
          options={controllingEntityOptions.filter(
            (option) =>
              !selectedEntityType ||
              selectedEntityType === option.type ||
              option.value === 'Not Found',
          )}
          onChange={handleSelectChange}
        />
      </Grid>

      <AcknowledgementModal
        open={showEntityFoundModal}
        onClick={handleEntityFound}
        heading={entityFoundModalHeading}
      ></AcknowledgementModal>

      <AcknowledgementModal
        open={showEntitySubmissionModal}
        onClick={handleEntitySubmit}
        heading={entitySubmissionModalHeading}
      ></AcknowledgementModal>

      <br></br>
      <br></br>
    </>
  )
}

export default SearchEntities
