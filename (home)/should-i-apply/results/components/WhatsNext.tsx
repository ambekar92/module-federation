import { CardActionArea } from '@mui/material'
import { Button, Card } from '@trussworks/react-uswds'
import React from 'react'

const WhatsNext = () => {
    return (
        <div>
            <h2>What's Next</h2>

            <Card>
                <div className='padding-x-2'>
                    <h3 className='margin-bottom-05'>Prepare for Application</h3>
                    <p className='margin-top-0'>GET YOUR BUSINESS READY FOR CERTIFICATION</p>

                    <p>Preview application questions, read tips for success, and know what documents to have ready when applying for certification.</p>

                </div>
                <div className='padding-bottom-2'>
                    <CardActionArea >
                        <Button style={{ float: 'right', paddingInline: '3rem' }} type='button' outline>Next</Button>
                    </CardActionArea>
                </div>
            </Card>

            <Card>
                <div className='padding-x-2'>
                    <h3 className='margin-bottom-05'>HUBZone Calculator</h3>
                    <p className='margin-top-0'>CHECK IF YOUR BUSINESS QUALIFIES FOR HUBZONE</p>

                    <p>The HUBZone Calculator is a tool designed to help applicants determine their eligibility for the HUBZone certification.</p>

                </div>
                <div className='padding-bottom-2'>
                    <CardActionArea >
                        <Button style={{ float: 'right', paddingInline: '3rem' }} type='button' outline>Next</Button>
                    </CardActionArea>
                </div>
            </Card>
        </div>
    )
}

export default WhatsNext