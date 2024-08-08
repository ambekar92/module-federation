'use client'
import React, { useState, useEffect } from 'react'
import { Header, Title, Grid, Button } from '@trussworks/react-uswds'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../../../constants/icons'
import Link from 'next/link'

export interface StyleSetting {
  bg: string
  textColor: string
  logo: string
  hoverColor: string
}
const styleSettings = {
  hoverColor: '',
  bg: 'bg-primary-dark',
  textColor: 'text-white',
  logo: SBA_LOGO_SQUARE_WHITE_URL,
}
export const UnauthenticatedItems: React.FC = () => {
  const [isLinkActive, setIsLinkActive] = useState(false)
  const selectedBottomRedBorder = '3px solid #CC0000'
  const handleLinkClick = () => {
    setIsLinkActive(true)
  }
  return (
    <Header
      className={`${styleSettings.bg} border-bottom-1px border-base-light padding-botom-1 flex-fill display-flex flex-row flex-justify-end`}
      basic
    >
      <Grid className=" padding-bottom-2">
        <Grid className="flex-fill display-flex flex-row flex-justify-end padding-top-0 margin-right-1">
          <Grid row>
            <Grid>
              <img
                className="padding-right-1 padding-top-1"
                src="/navbaricons/resources.svg"
                alt="logo"
                height={30}
              />
            </Grid>
            <Grid>
              <div
                className={`padding-top-1 padding-right-1`}
                style={{
                  borderBottom: isLinkActive ? selectedBottomRedBorder : '',
                }}
              >
                <Link
                  href="/resources/get-ready"
                  onClick={handleLinkClick}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Resources
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid row>
            <Grid>
              <img
                className="padding-right-1 padding-top-1"
                src="/navbaricons/gethelp.svg"
                alt="logo"
                height={30}
              />
            </Grid>
            <Grid>
              <div
                className="padding-top-1 padding-right-2"
                style={{ color: 'white' }}
              >
                Get Help
              </div>
            </Grid>
          </Grid>
          <Grid>
            <img
              className="padding-right-2"
              src="/navbaricons/navbarline.svg"
              alt="logo"
              height={40}
            />
          </Grid>
          <Grid>
            <div className="padding-right-1">
              <Link href="/login">
                <Button
                  className="usa-button usa-button--outline usa-button--inverse"
                  type="button"
                >
                  <span className={styleSettings.textColor}>Login</span>
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid>
            <Link
              key="primaryNav_2"
              className="usa-button"
              style={{ backgroundColor: '#D83933' }}
              href="/login"
            >
              <span className={styleSettings.textColor}>Sign up</span>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Header>
  )
}
