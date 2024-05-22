'use client'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, Collection, CollectionMeta, Link, Tag } from '@trussworks/react-uswds';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { mockApplications, mockNews } from './mockData';
import { Application, News } from './types';
import { useSession } from 'next-auth/react';


const FirmUserDashboard = () => {
    const [news, setNews] = useState<News[]>();
    const [applications, setApplications] = useState<Application[]>();

    useEffect(() => {
        setNews(mockNews)
    }, []);

    useEffect(() => {
        setApplications(mockApplications)
    })

    const session = useSession();
    return (
        <>
            <div>
                <h1>Welcome {session.data?.user?.name}</h1>
                <p>[Business name]</p>
            </div>

            <div>
                <div className='display-flex flex-row flex-justify flex-align-self-center'>

                <h2>News</h2>
                <Link href='#' >Open</Link>
                </div>
                <CardGroup>
                    {news?.map(n =>
                        <Card headerFirst key={n.id} gridLayout={{ desktop: { col: 4 } }}>
                            <CardHeader>
                                <h3 className="usa-card__heading">{n.title}</h3>
                                <p className="font-sans-6 text-primary margin-top-1">

                                </p>
                            </CardHeader>

                            <CardBody>

                                <p>
                                    {n.description}
                                </p>
                            </CardBody>
                            <CardFooter>
                                <Button type="button" outline className="usa-button">
                                    Read More
                                </Button>
                            </CardFooter>
                        </Card>)}
                </CardGroup>
            </div>

            <div>
                <h2>Applications</h2>
                <Collection>
                    {applications?.map(a =>
                        <Fragment key={a.id}>
                            <h3>{a.status}</h3>
                            <Card containerProps={{
                                className: 'bg-primary-lighter border-0',

                            }}>
                                <CardHeader className='display-flex flex-row flex-justify'>
                                    <h4>{a.title}</h4>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </CardHeader>
                                <CardBody>
                                    {a.status === 'In progress' && <span>{a.percentComplete}% Complete</span>}
                                </CardBody>
                                <CardFooter className='display-flex flex-row'>
                                    <div>
                                    {a.tags?.length > 0 && <CollectionMeta aria-label="Topics">
                                        {a.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                                    </CollectionMeta>}
                                    {a.status === 'Submitted' &&
                                        <div className='display-flex flex-row margin-top-2'>
                                            <div className='margin-right-2'>
                                                <strong>ID</strong> {a.id}
                                            </div>
                                            <div>
                                                <strong>Submitted</strong> {moment(a.submittedDate).format('MM/DD/YYYY')}
                                            </div>
                                        </div>
                                    }
                                    </div>
                                    {
                                        a.status !== 'Submitted' && <Button className='margin-left-auto' type='button'>{a.status === 'In progress' ? 'Continue' : 'Start'}</Button>
                                    }
                                </CardFooter>
                            </Card>
                        </Fragment>
                    )}
                </Collection>
            </div>
        </>
    )
}

export default FirmUserDashboard