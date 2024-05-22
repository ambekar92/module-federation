'use client'
import React, { useState } from 'react'
import {
  Grid,
  Header,
  GridContainer,
  Icon,
  Accordion,
  TextInput,
  Button,
} from '@trussworks/react-uswds'
import ReactQuill from 'react-quill'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import 'react-quill/dist/quill.snow.css'
import QAWrapper from '../components/MessageSidebar'
import styles from './Messages.module.scss'
import EmailList from './Emails'
import FilterList from '../components/Filter'
import { EmailSearch } from './constants'
import { EmailSearchLayout } from './EmailSearch'

const testItems: AccordionItemProps[] = [
  {
    id: 'item1',
    title: 'Filter/Sort',
    content: (
      <div>
        <FilterList />
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item2',
    title: 'Inbox-All',
    content: (
      <div>
        {' '}
        <EmailList />
      </div>
    ),
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item3',
    title: 'Draft',
    content: <div>This is content for Item 2</div>,
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item4',
    title: 'Sent',
    content: <div>This is content for Item 3</div>,
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item5',
    title: 'Archived',
    content: <div>This is content for Item 4</div>,
    expanded: false,
    headingLevel: 'h2',
  },
  {
    id: 'item6',
    title: 'Deleted',
    content: <div>This is content for Item 5</div>,
    expanded: false,
    headingLevel: 'h2',
  },
]

const sidebarContent = (
  <Accordion
    className={`${styles['usa-accordion__button']}`}
    items={testItems}
    multiselectable={true}
  />
)

const firstRow = [
  { id: '1', title: 'Filter', icon: <Icon.FilterList /> },
  { id: '1', title: 'Flag', icon: <Icon.Flag /> },
  { id: '2', title: 'Archive', icon: <Icon.FolderOpen /> },
  { id: '3', title: 'Mark as Read', icon: <Icon.MailOutline /> },
]

const secondRow = [
  {
    id: '1',
    title: 'To:',
    placeholder: 'Enter Names, or Emails',
    icon: <Icon.ExpandMore />,
  },
  { id: '2', title: 'Subject:', placeholder: 'Enter subject name', icon: '' },
]

const images = [
  { id: '1', src: <img src="/messageIcons/reply.png" alt="back" /> },
  {
    id: '2',
    src: <img src="/messageIcons/forward.png" alt="forwardmessages" />,
  },
  { id: '3', src: <img src="/messageIcons/back.png" alt="reply" /> },
]

function MainContent() {
  const [value, setValue] = useState('')
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ]
  const module = {
    toolbar: toolbarOptions,
  }

  return (
    <>
      <div className={`${styles['main-container']}`}>
        <Header className={'shadow-2 padding-bottom-2'}>
          <Grid row>
            <Grid
              desktop={{ col: 12 }}
              mobile={{ col: 8 }}
              className="margin-top-2 margin-right-0 margin-left-2 padding-right-4"
            >
              <div>
                {firstRow.map((item) => (
                  <div
                    className={`${styles['main-container-icon']}  float-left`}
                    key={item.id}
                  >
                    {item.icon}
                    <span className={'padding-left-1'}>{item.title}</span>
                  </div>
                ))}
              </div>
              {images.map((item) => (
                <div className="float-right " key={item.id}>
                  <span className="padding-left-2 ">{item.src}</span>
                </div>
              ))}
            </Grid>
          </Grid>
        </Header>

        {secondRow.map((item) => (
          <>
            <Header className=" shadow-2">
              <div>
                <Grid row>
                  <Grid className="margin-top-3 margin-right-0 margin-left-2">
                    {item.title}
                  </Grid>
                  <Grid className="desktop:flex-5  mobile-lg:flex-5 flex-12 padding-right-10">
                    <TextInput
                      className={styles['usa-email']}
                      placeholder={item.placeholder}
                      id="input-type-text"
                      name="input-type-text"
                      type="text"
                    />
                  </Grid>

                  <Grid className="padding-top-3 padding-right-4">
                    {item.icon}
                  </Grid>
                </Grid>
              </div>
            </Header>
          </>
        ))}

        <Header className={'shadow-2'}>
          <div>
            <Grid className="padding-top-2">
              <Grid>
                <ReactQuill
                  value={value}
                  placeholder="Add a message"
                  //onChange={(value) => setValue(value)}
                  modules={module}
                  theme="snow"
                />
              </Grid>
              <Grid className="padding-top-3">
                <button className="usa-button">Submit</button>
              </Grid>
            </Grid>
          </div>
        </Header>
      </div>
    </>
  )
}
const CreateMessages = () => {
  return (
    <>
      <div>
        <GridContainer containerSize="widescreen">
          <Header className="shadow-2">
            <Grid row>
              <Grid
                className={`${styles['usa-message-center']} mobile-lg:grid-col-6 desktop:grid-col-6 padding-top-0`}
              >
                Messaging Center
              </Grid>
              <Grid
                className={`${styles['usa-message-filter']}  mobile-lg:grid-col-3 desktop:grid-col-1 margin-right-2`}
              >
                {' '}
                <button
                  className={'usa-button usa-button--outline padding-2'}
                  type="button"
                >
                  <Icon.FilterList />
                  <span className="margin-left-1">Filter</span>
                </button>{' '}
              </Grid>
              <Grid className={`${styles['message-center-search']} `}>
                <TextInput
                  style={{
                    borderColor: '#ABABAB',
                    width: '250px',
                    borderRadius: '5px 0 0 5px',
                  }}
                  id="search-field-en-small"
                  placeholder="Search Messages"
                  type="search"
                  //onChange={(e) => setSearchQuery(e.target.value)}
                  name="search"
                />
                <button className={styles['usa-search-blue-button']}>
                  <img
                    className={styles['usa-search-icon']}
                    src="./search-icon.png"
                    alt="search-button"
                  />
                </button>
              </Grid>
            </Grid>
            {EmailSearch.map((search) => (
              <EmailSearchLayout key={search.id} {...search} />
            ))}
            <Grid className="grid-row flex-row" row>
              <Grid mobile={{ col: 3 }} className="desktop:grid-col-10"></Grid>

              <Grid className="desktop:grid-col-1 margin-left-3 margin-right-2 padding-bottom-3 padding-top-3">
                {' '}
                <Button className="usa-button" type="button">
                  Search
                </Button>
              </Grid>
            </Grid>
          </Header>
        </GridContainer>
      </div>
      <div>
        <GridContainer containerSize="widescreen">
          <Grid>
            <QAWrapper sidebar={sidebarContent} mainContent={MainContent()} />
          </Grid>
        </GridContainer>
      </div>
    </>
  )
}
export default CreateMessages
