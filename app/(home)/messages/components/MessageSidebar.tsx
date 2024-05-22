import React from 'react'
import { Grid, Button, Icon } from '@trussworks/react-uswds'
import Styles from './forms.module.scss'

interface QAWrapperProps {
  sidebar?: React.ReactNode // Optional content for the sidebar (left column)
  mainContent: React.ReactNode // Content for the main section (right column)
}

const QAWrapper: React.FC<QAWrapperProps> = ({ sidebar, mainContent }) => {
  return (
    <Grid className={Styles['mobile-grid-container']} row gap="lg">
      {sidebar && (
        <Grid className={`${Styles['item1']} margin-top-5 padding-bottom-0`}>
          <Grid className="padding-bottom-2">
            <Button style={{width: '200px'}}className="usa-button" type="button">
              <span className="padding-right-2 padding-top-4">
                <Icon.Edit />
              </span>
              New Messages
            </Button>
          </Grid>
          {sidebar}
        </Grid>
      )}
      <Grid className={Styles['item5']}>{mainContent}</Grid>
    </Grid>
  )
}

export default QAWrapper
