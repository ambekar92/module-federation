'use client'
import React, {useEffect} from 'react'
import {
  Header,
  Link,
  Grid,

} from '@trussworks/react-uswds'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../../../constants/icons'
import { TopPartInfo } from '../utils/constants'
import { Benefits } from './Benefits'
import { OurProgram } from './OurProgram'

export interface StyleSetting {
  bg: string
  textColor: string
  logo: string
  hoverColor: string
}
interface MenuItem {
  id: string
  url: string
}

export const TopLinks = () => {

  useEffect(() => {
    if (!TopPartInfo) {
      <h1>Loading...</h1>
    }

  }, [TopPartInfo])
  return (
    <Grid row gap="lg" className="display-flex flex-row flex-justify-center">
      {TopPartInfo.map((card, index) => (
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
export const LandingPage = () => {

  const styleSettings = {
    hoverColor: '',
    bg: 'bg-primary-dark',
    textColor: 'text-white',
    logo: SBA_LOGO_SQUARE_WHITE_URL,
  }

  return (
    <>
      <Header
        className="width-full maxw-full"
        style={{
          backgroundColor: '#1a4480',
          marginTop: '-8px',
          height: '250px',
        }}
      >
        <div className="padding-left-5 padding-y-2">
          <h1 style={{ color: 'white', fontWeight: '700' }}>
            Unified Certification Platform
          </h1>
          <div
            className="padding-bottom-2"
            style={{
              font: 'Source Sans 3',
              fontWeight: '100',
              fontSize: '22px',
              color: 'white',
              marginTop: '-18px',
            }}
          >
            Your one-stop destination for all SBA certification requirements.
          </div>
        </div>
      </Header>
      <div style={{ marginTop: '-90px' }}>
        <TopLinks />
      </div>
      <div>
        <Benefits />
      </div>
      <div>
        <OurProgram />
      </div>

    </>
  )
}

export default LandingPage
