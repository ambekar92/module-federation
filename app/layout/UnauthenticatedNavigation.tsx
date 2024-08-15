'use client'
import Menu from '@mui/material/Menu'
import { Button, Grid, Header } from '@trussworks/react-uswds'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../constants/icons'
import LoginMenu from './LoginMenu'
import SignupMenu from './SignupMenu'

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
export const UnauthenticatedNavigation = () => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [loginAnchorEl, setLoginAnchorEl] = useState<null | HTMLElement>(null);
  const [signupAnchorEl, setSignupAnchorEl] = useState<null | HTMLElement>(null);
  
  const loginMenuOpen = Boolean(loginAnchorEl);
  const signupMenuOpen = Boolean(signupAnchorEl);

  const openLoginMenu = (event: MouseEvent<HTMLElement>) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const openSignupMenu = (event: MouseEvent<HTMLElement>) => {
    setSignupAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setLoginAnchorEl(null);
    setSignupAnchorEl(null);
  };
  const selectedBottomRedBorder = '3px solid #CC0000'
  const handleLinkClick = () => {
    setIsLinkActive(true)
  }
  return (
    <>
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
            <Button
              onClick={openLoginMenu}
              className="usa-button usa-button--outline usa-button--inverse"
              type="button"
            >
              <span className={styleSettings.textColor}>Login</span>
            </Button>
          </Grid>
          <Grid>
            <Button
              onClick={openSignupMenu}
              className="usa-button usa-button--outline usa-button--inverse"
              type="button"
            >
              <span className={styleSettings.textColor}>Signup</span>
            </Button>
          </Grid>
        </Grid>
        <Menu style={{marginTop: '2rem', marginRight: '2rem'}} open={loginMenuOpen} anchorEl={loginAnchorEl} onClose={handleClose}>
          <LoginMenu />
        </Menu>
        <Menu style={{marginTop: '2rem', marginRight: '2rem'}} open={signupMenuOpen} anchorEl={signupAnchorEl} onClose={handleClose}>
          <SignupMenu />
        </Menu>
      </Grid>
    </Header>
    </>
  )
}
