import { Application } from '@/app/services/types/application';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { calculateApplicationExpirationDate } from '../utils/helpers';

interface ApplicationCardProps {
  data: Application[];
	actionButton: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
	clickedId: number | null;
	applicationDeleteOrWithdraw: (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => Promise<void>;
}

function ApplicationCard({ data, actionButton, clickedId, applicationDeleteOrWithdraw }: ApplicationCardProps) {
  return (
    <GridContainer containerSize="widescreen" className='padding-x-0'>
      {data.map((application: Application) => (
        <div  key={application.id} className='radius-md bg-primary-lighter margin-bottom-4'>
          <Grid row>
            <Grid col={4} className='text-center padding-2 display-flex flex-column bg-accent-cool-darker radius-left-md z-100'>
              <h2 className='margin-y-0 text-white'>{application.application_type.title}</h2>
              <div className='display-flex flex-column flex-justify-center bg-white margin-top-2 radius-md'>
                <h4 className='margin-y-05 text-size-xl'>{calculateApplicationExpirationDate(application.created_at)}</h4>
                <span className='text-size-base' style={{ fontWeight: 300 }}>Days Left</span>
              </div>
            </Grid>
            <Grid col={8} className='padding-2'>
              {clickedId === application.id ? (
                actionButton
              ) : (
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  data-status={application.workflow_state}
                  className="cursor-pointer position-absolute top-2 right-2"
                  onClick={(e) => applicationDeleteOrWithdraw(e, application.id)}
                />
              )}
              <Grid row gap='sm' className='height-full'>
                <>
                  {application.program_application.map(programApp => (
                    <>
                      <Grid className='margin-bottom-1' key={programApp.id} col='auto'>
                        <span
                          className='radius-md bg-base-dark text-size-xs padding-y-05 padding-x-1 text-white margin-right-1'
                          key={programApp.programs.name}
                        >
                          {programApp.programs.title}
                        </span>
                      </Grid>
                    </>
                  ))}
                </>

                <div className='width-full display-flex flex-justify flex-align-end'>
                  <div className='display-flex flex-column'>
                    <p className='margin-y-0'>
                      {application.created_at
                        ? (
                          <><strong>Expiration</strong> <span>{calculateApplicationExpirationDate(application.created_at, true)}</span></>
                        ): (
                          <strong>Application Withdrawn</strong>
                        )}
                    </p>
                    <p className='margin-y-0'><strong>Application ID</strong> <span>{application.id}</span></p>
                  </div>
                  <div>
                    {/* {contributorId
                      ? <Link className='usa-button' href={`/application/questionnaire/${contributorId}`}>Continue</Link>
                      : <Button type='button' disabled>Continue</Button>
                    } */}
                    <></>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
    </GridContainer>
  )
}
export default ApplicationCard
