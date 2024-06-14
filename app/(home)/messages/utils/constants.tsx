import { Icon } from '@trussworks/react-uswds'
import { Email } from './types';

export const EmailSearch = [
  { id: 1, searchName: 'Sender', placeholder: 'Sender'},
  { id: 2, searchName: 'Subject', placeholder: 'Subject'},
  { id: 3, searchName: 'Keywords', placeholder: 'Keywords'},
];

const defaultIcon = <Icon.AccountCircle />;

export const emails: Email[] = [
  {
    id: 1,
    read: false,
    icon: defaultIcon,
    from: 'Clark Kent',
    subject: 'Daily Planet Submission',
    date: '05/13/2024 | 10:40am',
    message: 'Attached you will find my latest article submission for the Daily Planet.',
  },
  {
    id: 2,
    read: true,
    icon: defaultIcon,
    from: 'Bruce Wayne',
    subject: 'Wayne Enterprises Update',
    date: '05/13/2024 | 10:40am',
    message: 'Meeting reminder for the new project discussion.',
  },
  {
    id: 3,
    read: false,
    icon: defaultIcon,
    from: 'Peter Quinn',
    subject: 'Appointment Confirmation',
    date: '05/13/2024 | 10:40am',
    message: 'Your next appointment at the clinic is scheduled for Tuesday.',
  },
  {
    id: 4,
    read: false,
    icon: defaultIcon,
    from: 'Diana Prince',
    subject: 'Ambassador Event',
    date: '05/13/2024 | 10:40am',
    message: 'Please confirm your attendance at the upcoming ambassador event.',
  },
  {
    id: 5,
    read: true,
    icon: defaultIcon,
    from: 'Peter Parker',
    subject: 'Science Fair',
    date: '05/13/2024 | 10:40am',
    message: 'Need some advice on my project for the upcoming science fair.',
  },
  {
    id: 6,
    read: false,
    icon: defaultIcon,
    from: 'Steve Rogers',
    subject: 'Historical Society',
    date: '05/13/2024 | 10:40am',
    message: 'Can we meet to discuss the upcoming exhibition on World War II?',
  },
];

export const firstRow = [
  { id: '1', title: 'Archive', icon: <Icon.FolderOpen /> },
  { id: '2', title: 'Flag', icon: <Icon.Flag /> },
]

export const secondRow = [
  {
    id: '1',
    title: 'To:',
    placeholder: 'John.Doe@sba.gov',
    icon: <Icon.ExpandMore />,
  },
  {
    id: '2',
    title: 'From:',
    placeholder: 'Firmbiz@smallbusiness.com',
    icon: <Icon.ExpandMore />,
  },
  {
    id: '3',
    title: 'Subject:',
    date: '05/13/2024 | 10:40am',
    placeholder: 'Subject of this message',
    icon: ''
  },
]

export const images = [
  { id: '1', src: <img src="/messageIcons/reply.png" alt="back" /> },
  {
    id: '2',
    src: <img src="/messageIcons/forward.png" alt="forwardmessages" />,
  },
  { id: '3', src: <img src="/messageIcons/back.png" alt="reply" /> },
]

export const filterItems = [
  {
    id: '1',
    column: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_cuurent_line.png"
        alt="read_mail"
      />
    ),
    icon: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_marked_as_read.png"
        alt="read_mail"
      />
    ),
    title: 'Mark as Read',
  },
  {
    id: '2',
    column: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_cuurent_line.png"
        alt="read_mail"
      />
    ),
    icon: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_marked_as_unread.png"
        alt="unread_mail"
      />
    ),
    title: 'Mark as Unread',
  },
  {
    id: '3',
    column: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_cuurent_line.png"
        alt="read_mail"
      />
    ),
    icon: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_important.png"
        alt="important_mail"
      />
    ),
    title: 'Important',
  },
]
