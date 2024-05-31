import React from 'react'

import {
  Accordion,
} from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import SamInfo from './SamInfo'
import NaicsCodes from './NaicsCodes'
import VaCert from './VaCert'

const testItems: AccordionItemProps[] = [
  {
    id: 'item1',
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
    id: 'item2',
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
    id: 'item3',
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
    id: 'item4',
    title: 'HUBZonw Calculator',
    content: (
      <div>
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item5',
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
  return (
    <>
      <div className='grid-row'>
        <div className="grid-col-12">
          <h1>Firm Summary</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>

        <div className="grid-col-12 margin-top-4">
          <Accordion
            items={testItems}
            multiselectable={true}
          />
        </div>
      </div>
    </>
  )
}

export default FirmSummary

