import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import FilterList from '../components/Filter'
import InboxEmailList from './email-folders/InboxEmailList';
import DraftEmailList from './email-folders/DraftEmailList';
import SentEmailList from './email-folders/SentEmailList';
import ArchivedEmailList from './email-folders/ArchivedEmailList';
import DeletedEmailList from './email-folders/DeletedEmailList';

const SidebarContent: React.FC = () => {
  const folders: AccordionItemProps[] = [
    {
      id: 'filter-sort',
      title: 'Filter/Sort',
      content: <FilterList />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'inbox-all',
      title: 'Inbox-All',
      content: <InboxEmailList />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'draft',
      title: 'Draft',
      content: <DraftEmailList />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'sent',
      title: 'Sent',
      content: <SentEmailList />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'archived',
      title: 'Archived',
      content: <ArchivedEmailList />,
      expanded: false,
      headingLevel: 'h2',
    },
    {
      id: 'deleted',
      title: 'Deleted',
      content: <DeletedEmailList />,
      expanded: false,
      headingLevel: 'h2',
    },
  ];

  return (
    <Accordion items={folders} multiselectable={true} />
  );
};

export default SidebarContent;
