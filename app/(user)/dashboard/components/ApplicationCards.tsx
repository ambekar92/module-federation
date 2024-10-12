
import { APPLICATION_QUESTIONNAIRE_LIST_PAGE, APPLICATION_VIEW_PAGE, buildRoute } from '@/app/constants/url';
import { Application } from '@/app/services/types/application-service/Application';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, GridContainer, Link } from '@trussworks/react-uswds';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { calculateApplicationExpirationDate, humanizeText } from '../utils/helpers';
import { useSessionUCMS } from '@/app/lib/auth';
import moment from 'moment';

interface ApplicationCardProps {
  data: Application[];
	actionButton: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
	clickedId: number | null;
	applicationDeleteOrWithdraw: (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => Promise<void>;
}

function ApplicationCards({ data, actionButton, clickedId, applicationDeleteOrWithdraw }: ApplicationCardProps) {
  const { data: session } = useSessionUCMS();

  const hasActiveCertification = (application: Application, programTitle: string) => {
    return application?.certifications?.some(cert =>
      cert.program.title === programTitle && cert.workflow_state === 'active'
    );
  };

  return (
    <GridContainer containerSize="widescreen" className='padding-x-0'>
      {data.map((application: Application) => {
        const userContributor = application.application_contributor.find(
          contributor => contributor.user_id === session?.user_id
        );
        const isOwner = application.application_contributor[0].user_id === session?.user_id
        return (
          <>
            <p className="text-size-lg margin-y-0">
              <strong>{application.sam_entity.legal_business_name}</strong>
            </p>
            <span className="text-size-sm">
              {application.workflow_state !== 'completed' &&
              <i>{humanizeText(userContributor?.workflow_state === 'returned_to_firm' ? 'Application Correction' : userContributor?.workflow_state ? userContributor?.workflow_state : '')}</i>
              }
            </span>
            <div  key={application.id} className='radius-md bg-primary-lighter margin-top-1 margin-bottom-4'>
              <Grid row>
                {application.workflow_state === 'draft' && (
                  <Grid col={4} className='text-center padding-2 display-flex flex-column bg-accent-cool-darker radius-left-md z-100'>
                    <h2 className='margin-y-0 text-white'>{application.application_type.title}</h2>
                    <div className='display-flex flex-column flex-justify-center bg-white margin-top-2 radius-md'>
                      <h4 className='margin-y-05 text-size-xl'>{calculateApplicationExpirationDate(application.created_at)}</h4>
                      <span className='text-size-base' style={{ fontWeight: 300 }}>Days Left</span>
                    </div>
                  </Grid>)}
                <Grid col={application.workflow_state !== 'draft' ? 12 : 8} className='padding-2'>
                  {isOwner && (
                    <>
                      {clickedId === application.id ? (
                        actionButton
                      ) : (
                        application.workflow_state !== 'under_review' && application.workflow_state !== 'completed' &&
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          data-status={application.workflow_state}
                          className="cursor-pointer position-absolute top-2 right-2"
                          onClick={(e) => applicationDeleteOrWithdraw(e, application.id)}
                        />
                      )}
                    </>
                  )}
                  <Grid row gap='sm' className='height-full'>
                    <>
                      {application.program_application.map(programApp => (
                        <>
                          <Grid className='margin-bottom-1' key={programApp.id} col='auto'>
                            <span
                              className={`radius-md text-size-xs padding-y-05 padding-x-1 text-white margin-right-1 ${hasActiveCertification(application, programApp.programs.title) ? 'bg-green' : 'bg-base-dark'}`}
                              key={programApp.programs.name}
                            >
                              {programApp.programs.title}
                            </span>
                          </Grid>
                        </>
                      ))}
                    </>

                    <div className='width-full'>
                      <div className='display-flex flex-column'>
                        <p className='margin-y-0'>
                          {application.created_at && application.workflow_state === 'draft'
                            ? (
                              <><strong>Expiration</strong> <span>{calculateApplicationExpirationDate(application.created_at, true)}</span></>
                            ) : application.workflow_state === 'withdrawn_by_applicant' ? (
                              <strong>Application Withdrawn</strong>
                            ) : ''}
                        </p>
                        {application.workflow_state === 'completed' &&
                          <ul className="usa-card-group">
                            {application?.certifications.map(certificate => (
                              <li className="usa-card grid-col-12 tablet:grid-col-6 desktop:grid-col-4" key={certificate.id}>
                                <div className="usa-card__container">
                                  <div className="usa-card__header">
                                    <h4 className="usa-card__heading">{certificate.program.title}</h4>
                                  </div>
                                  <div className="usa-card__body">
                                    <p>Status: {certificate.workflow_state === 'active' ? 'Approved' : certificate.workflow_state }</p>
                                    {certificate.workflow_state === 'active' &&
                                      <div>
                                        <p>Issue Date: {moment(certificate.issue_date).format('MMMM Do, YYYY')}</p>
                                        <p>Exit Date: {moment(certificate.expiry_date).format('MMMM Do, YYYY')}</p>
                                      </div>
                                    }
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        }
                        <p className='margin-y-0'><strong>Application ID</strong> <span>{application.id}</span></p>
                      </div>
                      <div>
                        {((application.workflow_state === 'draft') || application.workflow_state === 'returned_to_firm'
                        ) && application.id
                          ?
                          <Link
                            href={buildRoute(APPLICATION_QUESTIONNAIRE_LIST_PAGE, {
                              applicationId: application.id,
                            })}
                            className="float-right usa-button"
                          >
                         	Continue
                          </Link>
                          : <Link
                            href={buildRoute(APPLICATION_VIEW_PAGE, {
                              applicationId: application.id,
                            })}
                            className="float-right usa-button"
                          >
                         	View
                          </Link>
                        }
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </>
        )
      })}
    </GridContainer>
  )
}
export default ApplicationCards
