import {
  Header,
  Icon,
  Menu,
  NavMenuButton,
  PrimaryNav,
  Title,
} from '@trussworks/react-uswds'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  SBA_LOGO_SQUARE_WHITE_URL
} from '../../constants/icons'
import { Notification } from './components/navbarNotification'
import styles from './layout.module.scss'

//note that admin is set to 'admin' in .env.local file NEXT_PUBLIC_ADMIN_FEATURE_ENABLED ='admin'
import { ADMIN_BANNER_ROUTE } from '../../constants/routes'

export interface StyleSetting {
  bg: string
  textColor: string
  logo: string
  hoverColor: string
}

export interface adminNavBar {
  id: string
  url: string
}
const Navigation = () => {
  const adminBanner = ADMIN_BANNER_ROUTE
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false])
  const [selectedNameId, setSelectedNameId] = useState('')

  const styleSettings = {
    hoverColor: '',
    bg: 'bg-primary-darker',
    textColor: 'text-white',
    logo: SBA_LOGO_SQUARE_WHITE_URL,
  }

  const { status } = useSession()

  const selectedBottomRedBorder = '3px solid #CC0000'

  useEffect(() => {
    const pathname = window.location.pathname
    // Determine activeLink based on pathname (you'll need to customize this logic)
    switch (pathname) {
      case '/':
        setSelectedNameId('Home')
        break
      case '/admin/configuration':
        setSelectedNameId('System Configuration')
        break
      case '/entities':
        setSelectedNameId('Entities')
        break
      case '/users':
        setSelectedNameId('Users')
        break
      case '/messages':
        setSelectedNameId('Messages')
        break
      case '/documents':
        setSelectedNameId('Documents')
        break
      case '/saved':
        setSelectedNameId('Saved')
        break
      case '/support':
        setSelectedNameId('Support')
        break
      case '/should-i-apply/ownership':
        setSelectedNameId('Should I Apply?')
        break
      case '/application':
        setSelectedNameId('Application Prep')
        break
      case '/calculator':
        setSelectedNameId('HUBZone Calculator')
        break

      default:
        setSelectedNameId('') // Default to Home if no match
    }
  }, [])

  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen)
  }

  const handleToggleNavDropdown = (index: number): void => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false)
      newOpenState[index] = !prevNavDropdownOpen[index]
      return newOpenState
    })
  }

  const profileDropdown = [
    <Link key="one" href="/user/1">
      Profile
    </Link>,
    <Link
      key="two"
      onClick={() => {
        signOut({ callbackUrl: '/home' })
      }}
      href=""
    >
      Log Out
    </Link>,
  ]
  const notAuthenticatedLogin = [
    <a key="primaryNav_2" className="usa-button" style={{backgroundColor: '#D83933'}} href="/login">
      <span className={styleSettings.textColor}>Login</span>
    </a>,
  ]
  const primaryNavItems = [
    <React.Fragment key="primaryNav_0">
      <button
        type="button"
        className="usa-button__base usa-nav__link"
        onClick={(): void => {
          handleToggleNavDropdown(0)
        }}
      >
        <span
          className={`${styleSettings.textColor} border-right-0 margin-right-1 cursor-pointer`}
        >
          {' Notification'}
          <Icon.ExpandMore
            className="top-2px"
            style={{ rotate: navDropdownOpen[0] ? '180deg' : '' }}
          />
        </span>
      </button>
      <Menu
        id="extended-nav-section-two"
        className={styles['navbarNotification']}
        items={new Array(1).fill(<Notification />)}
        isOpen={navDropdownOpen[0]}
      />
    </React.Fragment>,

    <a key="primaryNav_2" className="usa-nav__link" href="#">
      <span className={styleSettings.textColor}>Account</span>
    </a>,

    <React.Fragment key="primaryNav_3">
      <button
        type="button"
        className="usa-button__base usa-nav__link"
        onClick={(): void => {
          handleToggleNavDropdown(1)
        }}
      >
        <span
          className={`${styleSettings.textColor} border-right-0 margin-right-1 cursor-pointer`}
        >
          User Profile{' '}
          <Icon.ExpandMore
            className="top-2px"
            style={{ rotate: navDropdownOpen[1] ? '180deg' : '' }}
          />
        </span>
      </button>
      <Menu
        id="extended-nav-section-three"
        items={profileDropdown}
        isOpen={navDropdownOpen[1]}
      />
    </React.Fragment>,
  ]

  const unAuthenticatedNavBar = [
    { id: 'Home', url: '/' },
    { id: 'Should I Apply?', url: '/should-i-apply/ownership' },
    { id: 'Application Prep', url: '/' },
    { id: 'HUBZone Calculator', url: '/' },
  ]
  const authenticatedNavBar = [
    { id: 'Home', url: '/' },
    { id: 'Message', url: '/messages' },
    { id: 'Documents', url: '/documents' },
    { id: 'Saved', url: '/' },
    { id: 'Support', url: '/' },
  ]
  const adminNavBar = [
    { id: 'Home', url: '/' },
    { id: 'System Configuration', url: '/admin/configuration' },
    { id: 'Entities', url: '/entities' },
    { id: 'Users', url: '/users' },
  ]

  return (
    <>
      <Header
        className={`${styleSettings.bg} border-bottom-1px border-base-light ${styles['mobile-border--none']}`}
        basic
        showMobileOverlay={mobileNavOpen}
      >
        <div
          className={
            'usa-nav-container display-flex flex-justify-between flex-align-center maxw-full'
          }
        >
          <div
            className={`usa-navbar ${styles['mobile-border--none']} width-full`}
          >
            <Title id="extended-logo">
              <img
                className="padding-y-05"
                src={`/${styleSettings.logo}`}
                alt="logo"
                height={50}
              />
            </Title>
            <NavMenuButton
              label="Menu"
              onClick={toggleMobileNav}
              className="usa-menu-btn margin-left-auto"
            />
          </div>
          {status === 'authenticated' ? (
            <PrimaryNav
              aria-label="Primary navigation"
              items={primaryNavItems}
              onToggleMobileNav={toggleMobileNav}
              mobileExpanded={mobileNavOpen}
            ></PrimaryNav>
          ) : (
            <PrimaryNav
              aria-label="Primary navigation"
              items={notAuthenticatedLogin}
              onToggleMobileNav={toggleMobileNav}
              mobileExpanded={mobileNavOpen}
            ></PrimaryNav>
          )}
        </div>
      </Header>
      <Header
        // className={`${styleSettings.bg} border-bottom-1px border-base-lighter padding-x-4 ${styles['mobile-border--none']}`}
        style={{ borderColor: '#F8DFE2' }}
        className={`border-bottom-1px padding-x-4 ${styles['mobile-border--none']}`}
      >
        <div className="usa-nav float-left">
          <ul className="usa-nav__primary float-left usa-accordion">

            {status === 'authenticated' && adminBanner === 'admin'
              ? adminNavBar.map((header: any, index: number) => (
                <li
                  key={index}
                  className="usa-nav__primary-item"
                  style={{
                    borderBottom:
                        selectedNameId === header.id
                          ? selectedBottomRedBorder
                          : '',
                  }}
                  onClick={() => setSelectedNameId(header.id)}
                >
                  <a className="usa-nav__link" href={header.url}>
                    <span className={` ${styleSettings.hoverColor}`}>
                      {' '}
                      {header.id}
                    </span>
                  </a>
                </li>
              ))
              : status === 'authenticated'
                ? authenticatedNavBar.map((header: any, index: number) => (
                  <li
                    key={index}
                    className="usa-nav__primary-item"
                    style={{
                      borderBottom:
                          selectedNameId === header.id
                            ? selectedBottomRedBorder
                            : '',
                    }}
                    onClick={() => setSelectedNameId(header.id)}
                  >
                    <a className="usa-nav__link" href={header.url}>
                      <span className={` ${styleSettings.hoverColor}`}>
                        {' '}
                        {header.id}
                      </span>
                    </a>
                  </li>
                ))
                : unAuthenticatedNavBar.map((header: any, index: number) => (
                  <li
                    key={index}
                    className="usa-nav__primary-item"
                    style={{
                      borderBottom:
                          selectedNameId === header.id
                            ? selectedBottomRedBorder
                            : '',
                    }}
                    onClick={() => setSelectedNameId(header.id)}
                  >
                    <a className="usa-nav__link" href={header.url}>
                      <span className={` ${styleSettings.hoverColor}`}>
                        {' '}
                        {header.id}
                      </span>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
        <div className="usa-nav float-right">
          <ul className="usa-nav__primary usa-accordion">
            <li className="usa-nav__primary-item">
              <a aria-disabled={true} tabIndex={-1} href="">
                {status !== 'authenticated' ? (
                  ''
                ) : (
                  <span className={` ${styleSettings.hoverColor}`}>
                    Business Name <Icon.ExpandMore className="top-2px" />
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </Header>
    </>
  )
}

export default Navigation
