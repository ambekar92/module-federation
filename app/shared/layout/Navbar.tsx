import {
  Header,
  Icon,
  Menu,
  NavDropDownButton,
  NavMenuButton,
  PrimaryNav,
  Title
} from '@trussworks/react-uswds'
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../../constants/icons'
import { Notification } from './components/navbarNotification'
import {adminNavBar}  from './utils/constant'
import styles from './layout.module.scss'
import ReactGA from "react-ga4";
import {REACT_GA_REPORT} from '../../constants/routes'

//note that admin is set to 'admin' in .env.local file NEXT_PUBLIC_ADMIN_FEATURE_ENABLED ='admin'
import { useSessionUCMS } from '@/app/lib/auth'
import { ADMIN_BANNER_ROUTE } from '../../constants/routes'
import { usePathname } from 'next/navigation'

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


const selectedBottomRedBorder = '3px solid #CC0000'

import dynamic from 'next/dynamic'

const Navigation = () => {
  const adminBanner = ADMIN_BANNER_ROUTE
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false])
  const [openProfile, setOpenProfile] = useState([false, false])
  const [selectedNameId, setSelectedNameId] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [items, setItems] = useState<MenuItem[]>([])

  ReactGA.initialize(`${REACT_GA_REPORT}`);

  const handleClickGetHelp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    ReactGA.event({
      category: "Engagement",
      action: "Clicked Get Help from Navbar",
      label: "Main Navigation"
    });
  }

  const handleClickOurProgram = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    ReactGA.event({
      category: "Engagement",
      action: "Clicked Our Program from Navbar",
      label: "Main Navigation"
    });
  }
  const ClientSideBusinessName = dynamic(() => Promise.resolve(() => (
    <div className="usa-nav float-right">
      <ul className="usa-nav__primary usa-accordion">
        <li className="usa-nav__primary-item">
          <a aria-disabled={true} tabIndex={-1} href="">
            {session.status === 'authenticated' && (
              <span className={` ${styleSettings.hoverColor}`}>
								Business Name <Icon.ExpandMore className="top-2px" />
              </span>
            )}
          </a>
        </li>
      </ul>
    </div>
  )), { ssr: false })

  const styleSettings = {
    hoverColor: '',
    bg: 'bg-primary-darker',
    textColor: 'text-white',
    logo: SBA_LOGO_SQUARE_WHITE_URL,
  }
  const session = useSessionUCMS()
  const path = usePathname()

  useEffect(() => {
    const emailPasswordAuthToken = Cookies.get('email_password_auth_token')
    if (session.status === 'authenticated' || !!emailPasswordAuthToken) {
      setIsAuthenticated(true)
    }
  }, [session, path])

  useEffect(() => {
    const pathname = window.location.pathname
    // Determine activeLink based on pathname (you'll need to customize this logic)
    switch (pathname) {
      case 'https://certification.sba.gov':
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

  useEffect(() => {
    if (isAuthenticated) {
      setItems([
        { id: 'Home', url: 'https://certification.sba.gov' },
        { id: 'Message', url: '/messages' },
        { id: 'Documents', url: '/documents' },
        { id: 'Saved', url: '/' },
        { id: 'Support', url: '/' },
      ])
    }
  }, [])

  const mockToggle = (): void => {
    /* mock submit fn */
  }
  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen)
  }

  const handleToggleNavDropdown = (index: number): void => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(true)
      newOpenState[index] = !prevNavDropdownOpen[index]
      return newOpenState
    })
  }
  const handleToggleProfileDropdown = (index: number): void => {
    setOpenProfile((openProfile) => {
      const newOpenStateProfile = Array(openProfile.length).fill(true)
      newOpenStateProfile[index] = !openProfile[index]
      return newOpenStateProfile
    })
  }
  const profileDropdown = [
    <Link key="one" href="/user/1">
      Profile
    </Link>,
    <Link
      key="two"
      onClick={() => {
        Cookies.remove('email_password_auth_token')
        signOut({ callbackUrl: '/home' })
      }}
      href=""
    >
      Log Out
    </Link>,
  ]
  const notAuthenticatedLogin = [
    <Link
      key="primaryNav_2"
      className="usa-button"
      style={{ backgroundColor: '#D83933' }}
      href="/login"
    >
      <span className={styleSettings.textColor}>Login</span>
    </Link>,
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
          handleToggleProfileDropdown(1)
        }}
      >
        <span
          className={`${styleSettings.textColor} border-right-0 margin-right-1 cursor-pointer`}
        >
          User Profile{' '}
          <Icon.ExpandMore
            className="top-2px"
            style={{ rotate: openProfile[1] ? '180deg' : '' }}
          />
        </span>
      </button>
      <Menu
        id="extended-nav-section-three"
        items={profileDropdown}
        isOpen={openProfile[1]}
      />
    </React.Fragment>,
  ]

  const unAuthenticatedItems = [
    <React.Fragment key="primaryNav_3">
      <Link className="usa-nav_link" href="https://certification.sba.gov">
        <span>Home</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="primaryNav_3">
      <Link className="usa-nav_link" href="/should-i-apply/ownership">
        <span>Should I Apply?</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="primaryNav_2">
      <NavDropDownButton
        menuId="extended-nav-section-resources"
        isOpen={navDropdownOpen[2]}
        label="Resources"
        onToggle={() => handleToggleNavDropdown(2)}
      />
      <Menu
        id="extended-nav-section-resources"
        items={[
          <Link key={0} href="/resources">
            Resources
          </Link>,
          <Link key={1} href="/resources/get-ready">
            Prepare for Application
          </Link>,
          <Link key={2} href="https://calculator.demo.sba-one.net/">
            HUBZone Calculatr
          </Link>,
          <Link
            key={3}
            href="https://sbaone.atlassian.net/wiki/spaces/UCPUKB/overview/"
          >
            Knowledge Base
          </Link>,
        ]}
        isOpen={navDropdownOpen[2]}
      />
    </React.Fragment>,
    <React.Fragment key="primaryNav_3">
      <a onClick={handleClickOurProgram}
        className="usa-nav_link"
        href="https://www.sba.gov/federal-contracting/contracting-assistance-programs"
      >
        <span>Our Programs</span>
      </a>
    </React.Fragment>,
    <React.Fragment key="primaryNav_3">
      <a onClick={handleClickGetHelp}
        className="usa-nav_link"
        href="https://sbaone.atlassian.net/servicedesk/customer/portal/12"
      >
        <span>Get Help</span>
      </a>
    </React.Fragment>,
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
            'usa-nav-container display-flex flex-align-center flex-justify maxw-full'
          }
        >
          <div
            className={`usa-navbar ${styles['mobile-border--none']} width-full`}
          >
            <Title id="extended-logo">
            <Link  href={'https://www.sba.gov/'}
              > 
              <img
                className="padding-y-05"
                src={`/${styleSettings.logo}`}
                alt="logo"
                height={50}
              />
                </Link>
            </Title>
            <NavMenuButton
              label="Menu"
              onClick={toggleMobileNav}
              className="usa-menu-btn margin-left-auto"
            />
          </div>
          {isAuthenticated ? (
            <PrimaryNav
              aria-label="Primary navigation"
              items={primaryNavItems}
              onToggleMobileNav={toggleMobileNav}
              mobileExpanded={mobileNavOpen}
            ></PrimaryNav>
          ) : (
            <div
              className="hi padding-0 margin-left-auto flex-align-self-center"
              style={{ position: 'relative' }}
            >
              <PrimaryNav
                className="padding-0 margin-top-1"
                aria-label="Primary navigation"
                items={notAuthenticatedLogin}
                onToggleMobileNav={toggleMobileNav}
                mobileExpanded={mobileNavOpen}
              ></PrimaryNav>{' '}
            </div>
          )}
        </div>
      </Header>
      <Header
        // className={`${styleSettings.bg} border-bottom-1px border-base-lighter padding-x-4 ${styles['mobile-border--none']}`}
        style={{ borderColor: '#F8DFE2' }}
        className={`border-bottom-1px padding-x-4 ${styles['mobile-border--none']}`}
      >
        <div className="usa-nav float-left">
          <div className="usa-nav__primary float-left usa-accordion">
            {isAuthenticated && adminBanner === 'admin' ? (
              adminNavBar.map((header: any, index: number) => (
                <ul>
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
                </ul>
              ))
            ) : isAuthenticated ? (
              items.map((header: any, index: number) => (
                <ul>
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
                </ul>
              ))
            ) : (
              <PrimaryNav
                aria-label="Primary navigation"
                items={unAuthenticatedItems}
                onToggleMobileNav={toggleMobileNav}
                mobileExpanded={mobileNavOpen}
              ></PrimaryNav>
            )}
          </div>
        </div>
        <ClientSideBusinessName />
      </Header>
    </>
  )
}
export default Navigation
