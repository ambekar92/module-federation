'use client'

import {
  Accordion,
} from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import { useApplicationData } from '../../firm/useApplicationData'
import NaicsCodes from './NaicsCodes'
import SamInfo from './SamInfo'
import VaCert from './VaCert'
import { useParams } from 'next/navigation'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'

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
  }
]

function FirmSummary() {
  const params = useParams<{application_id: string}>();
  const {applicationData, isLoading} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const appication = applicationData?.application_type ?? null;
  return (
    <>
      <div className='grid-row'>
        <div className="grid-col-12">
          <h1>Business Summary</h1>
          {isLoading && <p>Loading...</p>}
          {!isLoading && <p> {appication?.description ?? 'N/A'} </p>}
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
