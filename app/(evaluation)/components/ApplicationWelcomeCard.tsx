'use client'
import { FIRM_EVALUATIONS_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'
import { Button } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import { useApplicationData } from '../firm/useApplicationData'
import { useState } from 'react'

const ApplicationWelcomeCard = () => {
    const { application_id } = useParams<{ application_id: string }>();
    const { applicationData, isLoading} = useApplicationData();
    const [show, setShow] = useState<boolean>(true)


    const handlePostRequest = async () => {
        try {
            const postData = {
                application_id: parseInt(application_id),
            }
            await fetcherPOST(`${FIRM_EVALUATIONS_ROUTE}`, postData);
            setShow(false)
        } catch (error: any) {
            console.error('Network Error: ', error)
            return
        }
    }
    return (
        <>
            {(show && (applicationData?.workflow_state === 'draft' || applicationData?.workflow_state === 'submitted')) && <div className="grid-container">
                <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
                    <div className="usa-card__container">
                        <div className="usa-card__header">
                            <h3 className="usa-card__heading">
                                Welcome to this Application Review
                            </h3>
                        </div>
                        <div className="margin-top-1">
                            <div className="usa-card__body">
                                <p>
                                    Smiley was monstrous proud of his frog, and well he might be,
                                    for fellers that had <br /> traveled and been everywheres, all
                                    said he laid over any frog that ever they see.
                                </p>
                            </div>
                        </div>
                        <div className="margin-top-7">
                            <div className="usa-card__footer">
                                <Button type='button' className="usa-button" onClick={handlePostRequest}>
                                    Start Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </li>
            </div>}
        </>
    )
}

export default ApplicationWelcomeCard