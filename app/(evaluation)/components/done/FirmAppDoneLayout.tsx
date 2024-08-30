import { buildRoute, TASKS_DASHBOARD_PAGE } from '@/app/constants/url';
import { Alert } from '@trussworks/react-uswds';
import Link from 'next/link';

interface FirmAppLayoutProps {
  header: string;
  bodyText: string;
  buttonText: string;
  buttonLink: string;
  alertText: string;
  applicationId?: string;
}

function FirmAppDoneLayout({ header, bodyText, buttonText, buttonLink, alertText, applicationId }: FirmAppLayoutProps) {
  let finalButtonLink: string;

  if (buttonLink === TASKS_DASHBOARD_PAGE) {
    finalButtonLink = TASKS_DASHBOARD_PAGE;
  } else {
    finalButtonLink = buildRoute(buttonLink, { application_id: applicationId });
  }

  return (
    <div>
      <Alert type='success' heading='Success' headingLevel="h3">{alertText}</Alert>
      <div className='margin-top-4 padding-y-2 padding-x-3 bg-white border border-base-lighter'>
        <h2 className='margin-top-0'>{header}</h2>
        <p className='margin-top-3 margin-bottom-8 maxw-tablet'>{bodyText}</p>
        <Link className='usa-button' href={finalButtonLink}>{buttonText}</Link>
      </div>
    </div>
  );
}

export default FirmAppDoneLayout;
