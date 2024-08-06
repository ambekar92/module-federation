'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import Select from 'react-select'
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url'
import {
  Radio,
  Label,
  Grid,
  ButtonGroup,
  Button,
  Link,
} from '@trussworks/react-uswds'
import { Show } from '@/app/shared/components/Show'
import {
  controllingEntityTypeOptions,
  controllingEntities,
} from '../utils/helpers'
import AcknowledgementModal from './AcknowledgementModal'
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'

const SearchEntities = () => {
  const { contributorId } = useApplicationId()
  const steps = ['Is Entity Owned', 'Search Entity']
  const [currentStep, setCurrentStep] = useState(0)
  const [isEntityOwned, setIsEntityOwned] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedEntityType, setSelectedEntityType] = useState(null)
  const [showEntityFoundModal, setShowEntityFoundModal] = useState(false)
  const [showEntitySubmissionModal, setShowEntitySubmissionModal] =
    useState(false)
  const [showNewEntityModal, setShowNewEntityModal] = useState(false)
  const selectRef = React.useRef()
  const entityFoundModalHeading = 'New Controlling Entity Submission Request'
  const entitySubmissionModalHeading = 'Controlling Entity Submission Success'
  const entityRegistrationModalHeading = 'Register New Controlling Entity'

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

  const handleTypeChange = (e: any) => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelectedEntityType(e.target.value)
  }

  const handleOwnedChange = (e: any) => {
    e.target.value === 'Yes' && setIsEntityOwned(true)
    e.target.value === 'No' && setIsEntityOwned(false)
  }

  const handleSelectChange = (selection: any) => {
    setSelectedOption(selection)
    if (selection.value === 'Not Found') {
      setShowNewEntityModal(true)
      return
    }
    setShowEntityFoundModal(true)
  }

  const handleEntityFound = () => {
    setShowEntityFoundModal(false)
    setShowEntitySubmissionModal(true)
  }

  const handleEntitySubmit = () => {
    setShowEntitySubmissionModal(false)
    window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
      contributorId: contributorId,
      stepLink: '/ownership',
    })
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    isEntityOwned && setCurrentStep(currentStep + 1)
  }

  async function handleNewEntityRegistration() {
    setShowNewEntityModal(false)
    window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
      contributorId: 1,
      stepLink: '/entity-owned',
    })
  }

  async function handleNewEntityRegistration() {
    setShowNewEntityModal(false)
    window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
      contributorId: 1,
      stepLink: '/entity-owned',
    })
  }

  return (
    <>
      <Show>
        <Show.When isTrue={steps[currentStep] === 'Is Entity Owned'}>
          <Label className="text-bold" htmlFor="input-radio-entity-owned">
            Are you claiming to be Entity-Owned?
          </Label>
          <Radio
            id="input-radio-entity-owned-yes"
            name="input-radio-entity-type"
            onChange={handleOwnedChange}
            label="Yes"
            value="Yes"
          />
          <Radio
            id="input-radio-entity-owned-no"
            name="input-radio-entity-type"
            onChange={handleOwnedChange}
            defaultChecked
            label="No"
            value="No"
          />
        </Show.When>
      </Show>
      <Show>
        <Show.When isTrue={steps[currentStep] === 'Search Entity'}>
          <h2>Find Controlling Entity</h2>
          <p>
            From the the list below please select the Controlling Entity Type,
            followed by the Controlling Entity name.
          </p>
          <Label className="text-bold" htmlFor="input-radio-entity-type">
            Controlling Entity Type Selection
          </Label>
          {controllingEntityTypeOptions.map((option: any, index: number) => {
            return (
              <Radio
                key={index}
                id={`input-radio-entity-type-${index}`}
                name="input-radio-entity-type"
                onChange={handleTypeChange}
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
            open={showNewEntityModal}
            onClick={handleNewEntityRegistration}
            heading={entityRegistrationModalHeading}
          ></AcknowledgementModal>

          <AcknowledgementModal
            open={showEntitySubmissionModal}
            onClick={handleEntitySubmit}
            heading={entitySubmissionModalHeading}
          ></AcknowledgementModal>
        </Show.When>
      </Show>
      <br></br>
      <br></br>
      <ButtonGroup className="display-flex flex-justify border-top padding-y-2 margin-top-2 margin-right-2px">
        <Button
          type="button"
          className="usa-button usa-button--outline"
          aria-disabled={steps[currentStep] === 'Is Entity Owned'}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        {!isEntityOwned ? (
          <Link
            className="usa-button"
            aria-disabled={!contributorId}
            href={buildRoute(APPLICATION_STEP_ROUTE, {
              contributorId: contributorId,
              stepLink: '/ownership',
            })}
          >
            Next
          </Link>
        ) : (
          <Button
            type="button"
            disabled={steps[currentStep] === 'Search Entity'}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </ButtonGroup>
    </>
  )
}

export default SearchEntities
