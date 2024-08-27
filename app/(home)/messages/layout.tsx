'use client'
import {
  Button,
  Grid,
  GridContainer,
  Icon,
  TextInput
} from '@trussworks/react-uswds';
import { PropsWithChildren } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './components/Messages.module.scss';
import SidebarContent from './components/SidebarContent';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <GridContainer className='flex-fill padding-0' containerSize="widescreen">
      <div className={styles.header}>
        <h1>Messaging Center</h1>
        <div className='height-5'>
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
            name="search"
          />
          <Button type='button' className={styles['usa-search-icon']} >
            <Icon.Search size={3} />
          </Button>
        </div>
      </div>
      <Grid row gap="lg">
        <Grid col={3} >
          <SidebarContent />
        </Grid>
        <Grid col={9}>
          {children}
        </Grid>
      </Grid>
    </GridContainer>
  )
}

export default layout
