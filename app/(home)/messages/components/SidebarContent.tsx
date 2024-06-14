import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import EmailList from './EmailList'
import FilterList from '../components/Filter'
import { useState } from 'react'

const SidebarContent: React.FC = () => {
  const [focusedEmailId, setFocusedEmailId] = useState<number | null>(null);

  const testItems: AccordionItemProps[] = [
    {
      id: 'item1',
      title: 'Filter/Sort',
      content: <FilterList />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'item2',
      title: 'Inbox-All',
      content: <EmailList focusedEmailId={focusedEmailId} setFocusedEmailId={setFocusedEmailId} />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'item3',
      title: 'Draft',
      content: <EmailList focusedEmailId={focusedEmailId} setFocusedEmailId={setFocusedEmailId} />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'item4',
      title: 'Sent',
      content: <EmailList focusedEmailId={focusedEmailId} setFocusedEmailId={setFocusedEmailId} />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'item5',
      title: 'Archived',
      content: <EmailList focusedEmailId={focusedEmailId} setFocusedEmailId={setFocusedEmailId} />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'item6',
      title: 'Deleted',
      content: <EmailList focusedEmailId={focusedEmailId} setFocusedEmailId={setFocusedEmailId} />,
      expanded: false,
      headingLevel: 'h2',
    },
  ];

  return (
    <Accordion items={testItems} multiselectable={true} />
  );
};

export default SidebarContent;
