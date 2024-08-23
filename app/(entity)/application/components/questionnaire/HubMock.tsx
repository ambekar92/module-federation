import { useSessionUCMS } from '@/app/lib/auth';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';

function HubMock() {
  const session = useSessionUCMS();
  const accessToken = session?.data?.user?.accessToken;
  const userId = session?.data?.user.id;
  const { applicationId, contributorId } = useApplicationContext();

  return (
    <div style={{lineHeight: 1.5}}>
      <h2>HUBZone Calculator</h2>
      <p>
				The HUBZone Calculator is a tool designed to help applicants determine their eligibility for HUBZone certification. The calculator requires users to input specific information about the business’ locations and information about the business’ employees including the hours they worked, where they worked, and where they live if they are HUBZone Residents. By processing this data, the calculator assesses whether the business meets the HUBZone program requirements that the principal office be located within a designated HUBZone and that at least 35% of employees live in a HUBZone. The tool simplifies the eligibility verification process, offering a quick and user-friendly way for businesses to assess their potential for HUBZone certification.
        <TooltipIcon text='The HUBZone Eligibility Calculator is used to enter information about a firm’s employees and where they work. Once the steps are completed, you’ll be able to see if your firm appears to meet the HUBZone Program’s requirement that the principal office is located in a HUBZone and at least 35% of the firm’s employees reside in a HUBZone.' />
      </p>

      {/* <h3>What You Need</h3>
      <Grid row gap='md'>
        <a className='text-primary hover:text-primary-dark' href="/">Payroll Records</a>
        <a className='text-primary hover:text-primary-dark' href="/">Proof of HUBZone Residency</a>
      </Grid> */}

      <h3>Additional Information</h3>
      <p>You can always check your eligibility by visiting the HUBZone Calculator located on the Unified Certification Platform homepage.</p>

      <div className='display-flex flex-justify-end margin-top-5'>
        <a target="_blank" rel="noopener noreferrer" className='usa-button' href={`http://localhost:3001?wt=${accessToken}&application_contributor_id=${contributorId}&user_id=${userId}&application_id=${applicationId}`}>
					Start
        </a>
      </div>
    </div>
  )
}
export default HubMock
