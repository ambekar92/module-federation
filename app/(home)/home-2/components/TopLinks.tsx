'use client'
import {
  Grid,
  Link
} from '@trussworks/react-uswds'
import Typography from '@mui/material/Typography';
import { TopPartInfo } from '../utils/constants'

export const TopLinks = () => {
  return (
    <Grid row gap={4} className="display-flex flex-justify padding-x-6">
      {TopPartInfo?.map((card, index) => (
        <Grid key={index} tablet={{ col: 4 }}>
          <div
            className="bg-white radius-lg line-height-base border-primary-light border-1px padding-y-2 display-flex flex-column flex-align-center height-full"
            style={{
              boxShadow: '0px 5px 8px rgba(128, 128, 128, 0.2)',
            }}
          >
            <img src={card.iconName} height={60} className="margin-top-2" alt={`${card.title} icon`} />
            <div className='text-center margin-y-4'>
              <h3 className='margin-y-0'>{card.title}</h3>
              <Typography
                className="margin-y-0 padding-top-1 padding-x-2 text-center"
                variant='caption'
              >
                {card.description}
              </Typography>
            </div>
            <div className="margin-top-auto">
              <Link href={card.link} variant="unstyled" className="usa-button">
                {card.buttonName}
              </Link>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}
