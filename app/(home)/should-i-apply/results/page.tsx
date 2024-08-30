import { Show } from '@/app/shared/components/Show';
import { Alert } from '@trussworks/react-uswds';
import Programs from './components/Programs';
import WhatsNext from './components/WhatsNext';
import Resources from './components/Resources';

const ResultsPage = async () => {

  return (
    <>
      <header>
        <h1>Results</h1>
      </header>
      <main>
        <Show>
          <Show.When isTrue={true}>
            <Alert type='success' headingLevel='h2' heading='You May Be Eligible'>
              <span>Based on your responses, you may be eligibe for the following SBA Certification Programs.</span>
            </Alert>
            <Programs />
            <WhatsNext />
          </Show.When>
          <Show.Otherwise>
            <Alert type='warning' headingLevel='h2' heading='You May Not Be Eligible'>
              <span>Based on your responses, you are not eligible for any SBA Certification Program. Review the eligibility criteria details <a target='_blank' href='https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program#section-header-4' rel="noreferrer">here</a></span>
            </Alert>
            <Resources />
          </Show.Otherwise>
        </Show>
      </main>
    </>
  )
}

export default ResultsPage
