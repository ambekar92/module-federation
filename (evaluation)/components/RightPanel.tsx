import React from 'react'
import NotesWidget from './notes-widget/NotesWidget'
import RequestInformation from './notes-widget/RequestInformation'
import AnalystDocument from './notes-widget/AnalystDocument'

import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'

function RightPanel() {
  const testItems: AccordionItemProps[] = [
    {
      id: 'item1',
      title: 'RFI / RTFs',
      content: (
        <div>
          <RequestInformation />
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
          <NotesWidget />
        </div>
      ),
      expanded: true,
      headingLevel: 'h2',
    },
    {
      id: 'item3',
      title: 'Analyst Documents',
      content: (
        <div>
          <AnalystDocument />
        </div>
      ),
      expanded: false,
      headingLevel: 'h2',
    },
  ]
  return (
    <>
      <div className="padding-2 margin-top-2">
        <Accordion items={testItems} multiselectable={true} />
      </div>
    </>
  )
}

export default RightPanel