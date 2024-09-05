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
  {
    id: 'va_cert',
    title: 'VA Cert',
    content: (
      <div>
        <VaCert />
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'hubzone_calculator',
    title: 'HUBZone Calculator',
    content: (
      <div>
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'mmp_participation_info',
    title: 'MPP Participation Information',
    content: (
      <div>
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'controlling_entity',
    title: 'Controlling Entity',
    content: (
      <div>
        <ControllingEntity />
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  }

]

function FirmSummary() {
  const { applicationData } = useCurrentApplication();
  const application = applicationData?.application_type ?? null;
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
