import { Button, Grid, Icon } from '@trussworks/react-uswds'
import React from 'react'

interface QAWrapperProps {
  sidebar?: React.ReactNode // Optional (left column)
  mainContent: React.ReactNode // Content for the main section
}

const MessageLayout: React.FC<QAWrapperProps> = ({ sidebar, mainContent }) => {

  return (
    <>
      {sidebar && (
        <Grid col={3} className={'height-full bg-base-lighter padding-top-2 padding-bottom-1 radius-md'}>
          {/* <Grid className="padding-bottom-2">
            <Button className="width-full flex-align-center" type="button">
              <Icon.Edit />
              <span className='position-relative bottom-2px margin-left-1'>
								New Message
              </span>
            </Button>
          </Grid> */}
          {sidebar}
        </Grid>
      )}
      <Grid col='fill' style={{minHeight: '75vh'}}>{mainContent}</Grid>
    </>
  )
}

export default MessageLayout
