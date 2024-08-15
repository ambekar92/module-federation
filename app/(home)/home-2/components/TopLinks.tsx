'use client'
import {
    Grid,
    Link
} from '@trussworks/react-uswds'
import { TopPartInfo } from '../utils/constants'

export const TopLinks = () => {
    return (
      <Grid row gap="lg" className="display-flex flex-row flex-justify-center">
        {TopPartInfo?.map((card, index) => (
          <Grid key={index}>
            <div
              className="bg-white radius-lg line-height-base border-primary-light border-1px padding-y-2 display-flex flex-column flex-align-center"
              style={{
                width: '400px',
                height: '300px',
                boxShadow: ' 0px 5px 8px rgba(128, 128, 128, 0.2)',
              }}
            >
              <img src={card.iconName} height={60} className="margin-top-2"></img>
              <h3>{card.title}</h3>
              <p
                className="text-size-md padding-bottom-3"
                style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color: 'black',
                  marginTop: '-10px',
                }}
              >
                {card.description}
              </p>
              <div className="padding-top-3">
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