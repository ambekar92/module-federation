import { Button, ButtonGroup, GridContainer } from '@trussworks/react-uswds'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { setStep } from '../../redux/applicationSlice'
import { useApplicationDispatch } from '../../redux/hooks'
import { applicationSteps } from '../../utils/constants'
import { APPLICATION_STEP_ROUTE, ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url'

type EntityLayoutProps = {
  children: React.ReactNode
  contributorId: number
}

function EntityLayout({ children, contributorId }: EntityLayoutProps) {
  const dispatch = useApplicationDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setStep(0))
  }, [])

  // Do not delete
  // Once API is up this make the post call to update the data
  const handleNextClick = async () => {
    window.location.href =  buildRoute(APPLICATION_STEP_ROUTE, {
      contributorId: contributorId,
      stepLink: applicationSteps.ownership.link
    })
    // Post call to API to upload data goes here...
  }

  return (
    <>
      <div>
        <h1>Entity Owned</h1>
        <h3
          className="light"
          style={{ fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5' }}
        >
          Please enter the form below for the Controlling Entity you would like
          to register.
        </h3>
      </div>

      <hr className="margin-y-3 width-full border-base-lightest" />

      <div
        className="flex-fill"
        style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <GridContainer
          containerSize="widescreen"
          className={'width-full padding-y-2 margin-top-2 bg-base-lightest'}
        >
          {children}
        </GridContainer>

        <hr className="margin-y-3 margin-bottom-0 width-full border-base-lightest" />

        <ButtonGroup className="display-flex flex-justify padding-y-2 margin-right-2px">
          <Link
            href={ buildRoute(ASSIGN_DELEGATE_PAGE, {contributorId: contributorId})}
            className="usa-button usa-button--outline"
          >
            Previous
          </Link>
          <Button
            type="button"
            className="usa-button"
            onClick={handleNextClick}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Next'}
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
export default EntityLayout
