import React from 'react'
import {
  Header,
  Link,
  Title,
  Grid,
  Button,
} from '@trussworks/react-uswds'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../../../constants/icons'
export interface StyleSetting {
    bg: string
    textColor: string
    logo: string
    hoverColor: string
  }
export const NavbarHome2 = () => {
  const styleSettings = {
    hoverColor: '',
    bg: 'bg-primary-dark',
    textColor: 'text-white',
    logo: SBA_LOGO_SQUARE_WHITE_URL,
  }
  return (
    <Header
      className={`${styleSettings.bg} border-bottom-1px border-base-light padding-botom-1`}
      basic
    >
      <Grid className=" padding-bottom-2">
        <Grid row className="flex-1 padding-left-2">
          <Title id="extended-logo">
            <Link href={'https://www.sba.gov/'}>
              <img src={`/${styleSettings.logo}`} alt="logo" height={50} />
            </Link>
          </Title>
          <Grid className="flex-fill display-flex flex-row flex-justify-end margin-top-2 margin-right-1">
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
                  className="padding-top-1 padding-right-1"
                  style={{ color: 'white' }}
                >
                  Resources
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
                <Link href="/login" >
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
      </Grid>
    </Header>
  )
}
