import React from 'react';
import { Grid } from '@trussworks/react-uswds';
import Styles from './forms.module.scss';

interface QAWrapperProps {
  sidebar?: React.ReactNode;    // Optional content for the sidebar (left column)
  mainContent: React.ReactNode; // Content for the main section (right column)
}

const QAWrapper: React.FC<QAWrapperProps> = ({ sidebar, mainContent }) => {
  return (
    <Grid row gap='lg' className='border-top'>
      {sidebar && (
        <Grid col={4} className={`border-right ${Styles['hidden-mobile']}`}>
          {sidebar}
        </Grid>
      )}
      <Grid col={8} className='padding-bottom-3'>
        {mainContent}
      </Grid>
    </Grid>
  );
};

export default QAWrapper;
