import { Icon } from '@trussworks/react-uswds'
import { Email } from './types';
import InitialsCircle from '../../../(admin)/admin/users/components/AccountCircle'

export const EmailSearch = [
  { id: 1, searchName: 'Sender', placeholder: 'Sender'},
  { id: 2, searchName: 'Subject', placeholder: 'Subject'},
  { id: 3, searchName: 'Keywords', placeholder: 'Keywords'},
];

export const inboxTestData = {
  links:{
    next: null,
    previous: null
  },
  pagination: {
    previous_page: null,
    current_page: 1,
    next_page: null,
    page_size: 50
  },
  count: 1,
  total_pages: 1,
  next: false,
  results: [
    {
      uuid: 1,
      // read: false,
      //icon: <InitialsCircle name={'Clark Kent'}/>,
      sender: {display_name:'Clark Kent', is_user: true},
      subject: 'Daily Planet Submission',
      sent_at: '2024-06-11T19:27:38.200399Z',
      total_unread:'10',
      last_message: 'Attached you will find my latest article submission for the Daily Planet.',
    },
    {
      uuid: 2,
      // read: false,
      //icon: <InitialsCircle name={'Clark Kent'}/>,
      sender: {display_name:'Bruce Wayne', is_user: true},
      subject: 'Wayne Enterprises Update',
      sent_at: '2024-06-11T19:27:38.200399Z',
      total_unread:'10',
      last_message: 'Meeting reminder for the new project discussion',
    },
    {
      uuid: 3,
      // read: false,
      //icon: <InitialsCircle name={'Clark Kent'}/>,
      sender: {display_name:'Peter Quinn', is_user: true},
      subject: 'Appointment Confirmation',
      sent_at: '2024-06-11T19:27:38.200399Z',
      total_unread:'10',
      last_message: 'Your next appointment at the clinic is scheduled for Tuesday.',
    }
  ]}

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
