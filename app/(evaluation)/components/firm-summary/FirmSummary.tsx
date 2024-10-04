'use client'

import {
  Accordion,
} from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import { useCurrentApplication } from '../../firm/useApplicationData'
import NaicsCodes from './NaicsCodes'
import SamInfo from './SamInfo'
import VaCert from './VaCert'
import ControllingEntity from './ControllingEntity'

function FirmSummary() {
  const { applicationData } = useCurrentApplication();
  const application = applicationData?.application_type ?? null;
  const applicationPrograms = applicationData?.program_application ?? [];

  const hasVosbSdvosb = applicationPrograms.some(program =>
    [4, 5].includes(program.program_id)
  );

  const hasHubZone = applicationPrograms.some(program =>
    program.program_id === 2
  );

  const hasMpp = applicationPrograms.some(program =>
    program.programs.name === 'protege'
  );

  const accordionItems: AccordionItemProps[] = [
    {
      id: 'sam_info',
      title: 'SAM Info',
      content: (
        <div>
          <SamInfo />
        </div>
      ),
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'naics_codes',
      title: 'NAICS Codes',
      content: (
        <div>
          <NaicsCodes />
        </div>
      ),
      expanded: false,
      headingLevel: 'h2',
    },
  ];

  if (hasVosbSdvosb) {
    accordionItems.push({
      id: 'va_cert',
      title: 'VA Cert',
      content: (
        <div>
          <VaCert />
        </div>
      ),
      expanded: false,
      headingLevel: 'h2',
    });
  }

  if (hasHubZone) {
    accordionItems.push({
      id: 'hubzone_calculator',
      title: 'HUBZone Calculator',
      content: (
        <div>
        </div>
      ),
      expanded: false,
      headingLevel: 'h2',
    });
  }

  if (hasMpp) {
    accordionItems.push({
      id: 'mmp_participation_info',
      title: 'MPP Participation Information',
      content: (
        <div>
        </div>
      ),
      expanded: false,
      headingLevel: 'h2',
    });
  }

  return (
    <>
      <div className='grid-row'>
        <div className="grid-col-12">
          <h1>Firm Summary</h1>
          <p>{application?.description ?? 'N/A'} </p>
        </div>
        <div className="grid-col-12 margin-top-4">
          <Accordion
            items={accordionItems}
            multiselectable={true}
          />
        </div>
      </div>
    </>
  )
}

export default FirmSummary
