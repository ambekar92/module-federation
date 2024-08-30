import { getUserRole } from '@/app/shared/utility/getUserRole'
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
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../constants/icons'
import { REACT_GA_REPORT } from '../constants/routes'
import styles from './Layout.module.scss'
import { NavbarNotification } from './navbar-notification/NavbarNotification'
import { adminNavBar } from './types/constant'

//note that admin is set to 'admin' in .env.local file NEXT_PUBLIC_ADMIN_FEATURE_ENABLED ='admin'
import { useSessionUCMS } from '@/app/lib/auth'
import { ADMIN_BANNER_ROUTE } from '../constants/routes'
import { UnauthenticatedNavigation } from './UnauthenticatedNavigation'
const selectedBottomRedBorder = '3px solid #CC0000'

import {
  buildRoute,
  DASHBOARD,
  DOCUMENT_PAGE,
  FIRM_EVALUATION_PAGE,
  MESSAGE_PAGE,
  REVIEWERS_DASHBOARD_PAGE,
  TASKS_DASHBOARD_PAGE,
  USER_PROFILE_PAGE
} from '@/app/constants/url'
import dynamic from 'next/dynamic'

const Navbar = () => {
  const adminBanner = ADMIN_BANNER_ROUTE
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false])
  const [openProfile, setOpenProfile] = useState([false, false])
  const [selectedNameId, setSelectedNameId] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const params = useParams<{application_id: string}>();
  const session = useSessionUCMS()
  const userRole = getUserRole(session?.data?.permissions || []);
  const path = usePathname()

  const isInApplicationFlow = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.includes('/firm/application/');
    }
    return false;
  };

  ReactGA.initialize(`${REACT_GA_REPORT}`);

  const handleClickGetHelp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    ReactGA.event({
      category: 'Engagement',
      action: 'Clicked Get Help from Navbar',
      label: 'Main Navigation'
    });
  }

  const handleClickOurProgram = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    ReactGA.event({
      category: 'Engagement',
      action: 'Clicked Our Program from Navbar',
      label: 'Main Navigation'
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
    bg: '#002e6d',
    textColor: 'text-white',
    logo: SBA_LOGO_SQUARE_WHITE_URL,
  }

  useEffect(() => {
    const emailPasswordAuthToken = Cookies.get('email_password_auth_token')
    if (session.status === 'authenticated' || !!emailPasswordAuthToken) {
      setIsAuthenticated(true)
    }
  }, [session, path])

  useEffect(() => {
    switch (true) {
      case isInApplicationFlow():
        setSelectedNameId('Home')
        break
      case path === '/my-tasks':
        setSelectedNameId('My Tasks')
        break
      case path === '/team':
        setSelectedNameId('Team')
        break
      case path === '/team-tasks':
        setSelectedNameId('Team Tasks')
        break
      case path === '/saved':
        setSelectedNameId('Saved')
        break
      case path === '/support':
        setSelectedNameId('Support')
        break
      case path === '/admin/configuration':
        setSelectedNameId('System Configuration')
        break
      case path === '/entities':
        setSelectedNameId('Entities')
        break
      case path === '/users':
        setSelectedNameId('Users')
        break
      case path === '/messages':
        setSelectedNameId('Messages')
        break
      case path === '/documents':
        setSelectedNameId('Documents')
        break
      case path === '/should-i-apply/ownership':
        setSelectedNameId('Should I Apply?')
        break
      case path === '/application':
        setSelectedNameId('Application Prep')
        break
      case path === '/calculator':
        setSelectedNameId('HUBZone Calculator')
        break
      case path === 'https://certification.sba.gov':
        setSelectedNameId('Home')
        break
      default:
        setSelectedNameId('')
    }
  }, [path])

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

  const handleSignOut = async () => {
    const okta_oauth2_issuer = process.env.NEXT_PUBLIC_LOGOUT_URL;
    const idToken = Cookies.get('idtoken');
    const post_logout_redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_POST_REDIRECT_URL || '');

    Cookies.remove('email_password_auth_token');
    Cookies.remove('accesstoken');
    Cookies.remove('idtoken');
    Cookies.remove('next-auth.csrf-token', { path: '/' });
    Cookies.remove('next-auth.callback-url', { path: '/' });
    Cookies.remove('maxgov_auth_token');

    localStorage.clear();

    await signOut({ redirect: false });

    if (idToken) {
      const logout_url = `${okta_oauth2_issuer}/oauth2/default/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
      window.location.href = logout_url;
    } else {
      window.location.href = '/home';
    }
  }

  const profileDropdown = [
    <Link key="one" href={USER_PROFILE_PAGE}>
      Profile
    </Link>,
    <Link
      key="two"
      onClick={handleSignOut}
      href=""
    >
      Log Out
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
        items={new Array(1).fill(<NavbarNotification />)}
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
            HUBZone Calculator
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
        className="usa-nav_link margin-left-4"
        href="https://sbaone.atlassian.net/servicedesk/customer/portal/12"
      >
        <span>Get Help</span>
      </a>
    </React.Fragment>,
  ]

  const authenticatedItems = [
    ...(isInApplicationFlow() ? [
      <React.Fragment key="auth_1">
        <Link className="usa-nav_link" href={buildRoute(FIRM_EVALUATION_PAGE, { application_id: params.application_id })}>
          <span>Home</span>
        </Link>
      </React.Fragment>
    ] : []),
    ...(userRole === 'external' ? [
      <React.Fragment key="auth_4">
        <Link
          className="usa-nav_link"
          href={DASHBOARD}>
          <span>Dashboard</span>
        </Link>
      </React.Fragment>
    ] : []),
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={MESSAGE_PAGE}>
        <span>Messages</span>
      </Link>
    </React.Fragment>,
    <React.Fragment key="auth_2">
      <Link className="usa-nav_link" href={DOCUMENT_PAGE}>
        <span>Documents</span>
      </Link>
    </React.Fragment>,
    ...(userRole === 'analyst' || userRole === 'approver' || userRole === 'reviewer' || userRole === 'screener' ? [
      <React.Fragment key="auth_3">
        <Link className="usa-nav_link" href={TASKS_DASHBOARD_PAGE}>
          <span>My Tasks</span>
        </Link>
      </React.Fragment>
    ] : []),
    ...(userRole === 'analyst' || userRole === 'approver' ? [
      <React.Fragment key="auth_4">
        <Link
          className="usa-nav_link"
          href={REVIEWERS_DASHBOARD_PAGE}>
          <span>Team Tasks</span>
        </Link>
      </React.Fragment>
    ] : [])
  ];

  return (
    <>
      <Header
        style={{backgroundColor: styleSettings.bg}}
        className={`${isAuthenticated && adminBanner === 'admin' ? 'border-base-light border-bottom-1px' : ''} ${styles['mobile-border--none']}`}
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
            <UnauthenticatedNavigation/>
          )}
        </div>
      </Header>
      {isAuthenticated && adminBanner === 'admin' ? (
        adminNavBar.map((header: any, index: number) => (
          <Header
            key={index}
            style={{ borderColor: '#F8DFE2' }}
            className={`border-bottom-1px padding-x-4 ${styles['mobile-border--none']}`}
          >
            <div className="usa-nav float-left">
              <div className="usa-nav__primary float-left usa-accordion">
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
              </div>
            </div>
            <ClientSideBusinessName />
          </Header>
        ))
      ) : isAuthenticated ? (
        <PrimaryNav
          aria-label="Primary navigation"
          items={authenticatedItems}
          onToggleMobileNav={toggleMobileNav}
          mobileExpanded={mobileNavOpen}
        ></PrimaryNav>
      ) : (
        <>
          {/* <PrimaryNav
                  aria-label="Primary navigation"
                  items={unAuthenticatedItems}
                  onToggleMobileNav={toggleMobileNav}
                  mobileExpanded={mobileNavOpen}
                ></PrimaryNav> */}
        </>
      )}
    </>
  )
}
export default Navbar
