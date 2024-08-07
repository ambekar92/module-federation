import React from 'react'
import styles from './Evaluation.module.scss';
import NotesWidget from './notes-widget/NotesWidget'
import AnalystDocument from './notes-widget/AnalystDocument'

import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { useSessionUCMS } from '@/app/lib/auth';
import RtfRtiForm from './rtf-rfi/form/RtfRfiForm';

function RightPanel() {
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const rightPanel: AccordionItemProps[] = [
    {
      id: 'rft',
      title: userRole === 'screener' ? 'Return to Business' : 'Request for Information',
      content: (
        <>
          <RtfRtiForm />
        </>
      ),
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'item2',
      title: 'Notes',
      content: (
        <NotesWidget />
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
