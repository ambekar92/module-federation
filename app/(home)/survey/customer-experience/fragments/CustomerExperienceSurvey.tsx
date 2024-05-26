'use client'
import { useState } from 'react'
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import CustomHeader from '@/app/shared/components/forms/CustomHeader'
import Questionnaire from '../components/Questionnaire'

const CustomerExperienceSurvey = () => {
  const [lastPage, setLastPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [continueSurvey, setContinueSurvey] = useState(false)

  const handleNext = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const decrementLastPage = () => {
    setLastPage(lastPage - 1)
  }

  const incrementLastPage = () => {
    setLastPage(lastPage + 1)
  }

  const proceedWithSurvey = () => {
    setContinueSurvey(true)
  }

  return (
    <section>
      <CustomHeader title="UCP Customer Feedback Survey"></CustomHeader>

      {currentPage === 1 ? (
        <div>
          <h2 className="text-light">
            Thank you in advance for taking time to complete SBA&apos;`s UCP
            Customer Feedback Survey. This survey is expected to take no more
            than 5 minutes to complete. Your response is anonymous, and your
            participation is voluntarily. Your feedback will help SBA improve
            service.
          </h2>
          <h2 className="text-light padding-bottom-2">
            SBA cannot conduct this survey and you are not required to respond
            unless the survey is approved by the Office of Management and Budget
            (OMB). The OMB Control (Approval) Number for this survey is
            3245-0398. It expires on 04/30/2024. Thank you!
          </h2>
        </div>
      ) : currentPage === lastPage ? (
        <div>
          <h2 className="text-light">Thank you for taking the survey.</h2>
          <h2 className="text-light padding-bottom-2">
            If you have any questions or comments about this survey, you may
            submit them to Manny.spiderman@sba.gov
          </h2>
        </div>
      ) : null}

      <Grid desktop={{ col: 12 }} className="padding-bottom-3">
        <form>
          <Questionnaire
            currentPage={currentPage}
            decrementLastPage={decrementLastPage}
            incrementLastPage={incrementLastPage}
            proceedWithSurvey={proceedWithSurvey}
          />
        </form>
      </Grid>

      <ButtonGroup className="display-flex flex-justify flex-fill border-top padding-y-2">
        <Button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={
            currentPage === 1 || currentPage === lastPage ? 'display-none' : ''
          }
        >
          Previous
        </Button>
        {currentPage === lastPage ? (
          <Link className="usa-button usa-button" href="/user/firm/dashboard">
            Done
          </Link>
        ) : (
          <Button type="button" onClick={handleNext} disabled={!continueSurvey}>
            Next
          </Button>
        )}
      </ButtonGroup>
    </section>
  )
}
export default CustomerExperienceSurvey
