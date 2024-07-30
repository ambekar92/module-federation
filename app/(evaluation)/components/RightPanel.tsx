import React from 'react'
import styles from './Evaluation.module.scss';
import NotesWidget from './notes-widget/NotesWidget'
import RequestInformation from './notes-widget/RequestInformation'
import AnalystDocument from './notes-widget/AnalystDocument'

import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'

function RightPanel() {
  const rightPanel: AccordionItemProps[] = [
    {
      id: 'rft',
      title: 'Request for Information',
      content: (
        <>
          <RequestInformation />
        </>
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
      expanded: false,
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
        <Accordion className={styles['accordion']} items={rightPanel} multiselectable={true} />
      </div>
    </>
  )
}

export default RightPanel
