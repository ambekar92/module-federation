'use client'
import { COMPLETE_EVALUATION_TASK } from '@/app/constants/routes'
import { axiosInstance } from '@/app/services/fetcher'
import { Button } from '@trussworks/react-uswds'
import { useApplicationData } from '../firm/useApplicationData'

const ApplicationWelcomeCard = () => {
    const {applicationData} = useApplicationData()

    const handlePostRequest = async () => {
        try {
           await axiosInstance.post(COMPLETE_EVALUATION_TASK, {process_id: applicationData?.process.id, data: applicationData?.process.data});
        } catch (error: any) {
            console.error('Failed to complete evaluation task', error)
        }
    }
    return (
        <>
            <div className="grid-container">
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
                                    Complete Screening
                                </Button>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        </>
    )
}

export default ApplicationWelcomeCard