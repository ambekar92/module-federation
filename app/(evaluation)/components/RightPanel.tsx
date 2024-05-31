import React from 'react'
import RightPanelContent from '../components/RightPanelContent'

import {
  Accordion,
} from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'

const testItems: AccordionItemProps[] = [
  {
    id: 'item1',
    title: 'RFI / RTFs',
    content: (
      <div>
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item2',
    title: 'Notes',
    content: (
      <div>
        <RightPanelContent />
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item3',
    title: 'Documents',
    content: (
      <div>
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  }
]

function RightPanel() {
  return (
    <>
      <div className="padding-2 margin-top-2">
        <Accordion
          items={testItems}
          multiselectable={true}
        />
      </div>
    </>
  )
}

export default RightPanel
