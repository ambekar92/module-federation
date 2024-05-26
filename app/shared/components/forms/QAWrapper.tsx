import React from 'react';
import { Grid } from '@trussworks/react-uswds';
import Styles from './forms.module.scss';

interface QAWrapperProps {
  sidebar?: React.ReactNode;    // Optional content for the sidebar (left column)
  mainContent: React.ReactNode; // Content for the main section (right column)
	fill?: boolean;
}

const QAWrapper: React.FC<QAWrapperProps> = ({ sidebar, mainContent, fill }) => {
  return (
    <Grid row gap='lg' className={`border-top ${fill && 'flex-fill'}`}>
      {sidebar && (
        <Grid col={4} className={`border-right padding-bottom-3 ${Styles['hidden-mobile']}`}>
          {sidebar}
        </Grid>
      )}
      <Grid mobile={{col: 12}} tablet={{col: 8}} className='padding-bottom-3'>
        {mainContent}
      </Grid>
    </Grid>
  );
};

export default QAWrapper;
