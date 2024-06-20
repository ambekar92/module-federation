'use client'
import {
  Grid,
  GridContainer,
  Header,
  TextInput
} from '@trussworks/react-uswds'
import 'react-quill/dist/quill.snow.css'
import SidebarContent from './SidebarContent'
import MessageLayout from './MessageLayout'
import styles from '../utils/Messages.module.scss'
import MainContent from './MainContent'

export type InboxItem = {
  uuid: string;
  subject: string;
  sender: string | { display_name: string; is_user: boolean };
  sent_at: string;
  total_unread: number | string;
  last_message: string;
};

export type InboxResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  pagination: {
    previous_page: number | null;
    current_page: number;
    next_page: number | null;
    page_size: number;
  };
  count: number;
  total_pages: number;
  next: string | boolean;
  previous: string | boolean;
  results: InboxItem[];
};

const CreateMessages = () => {
  return (
    <GridContainer className='flex-fill padding-0' containerSize="widescreen">
      <Header className='display-flex flex-justify flex-align-center width-full'>
        <h1>Messaging Center</h1>
        <div className='height-5 margin-left-auto'>
          <TextInput
            className={`${styles['input-search']}`}
            style={{
              borderColor: '#ABABAB',
              width: '250px',
              borderRadius: '4px 0 0 4px',
            }}
            id="search-field-en-small"
            placeholder="Search Messages"
            type="search"
            //onChange={(e) => setSearchQuery(e.target.value)}
            name="search"
          />
          <button className={'bg-primary hover:bg-primary-dark cursor-pointer border-0 height-5 width-5 radius-right-md'}>
            <img
              className={styles['usa-search-icon']}
              src="./search-icon.png"
              alt="search-button"
            />
          </button>
        </div>
      </Header>

      <Grid row gap="lg">
        <MessageLayout sidebar={<SidebarContent />} mainContent={MainContent()} />
      </Grid>
    </GridContainer>
  )
}
export default CreateMessages
