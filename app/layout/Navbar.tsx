import {
  Header,
  Icon,
  NavMenuButton,
  Title
} from '@trussworks/react-uswds'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../constants/icons'
import { REACT_GA_REPORT } from '../constants/routes'
import styles from './Layout.module.scss'
import { adminNavBar } from './types/constant'

//note that admin is set to 'admin' in .env.local file NEXT_PUBLIC_ADMIN_FEATURE_ENABLED ='admin'
import { useSessionUCMS } from '@/app/lib/auth'
import { ADMIN_BANNER_ROUTE } from '../constants/routes'
import { UnauthenticatedNavigation } from './UnauthenticatedNavigation'
const selectedBottomRedBorder = '3px solid #CC0000'

import dynamic from 'next/dynamic'
// import useIsMobile from '../shared/hooks/useIsMobile'
import AuthenticatedNavitems from './nav-items/AuthenticatedNavitems'
import MobileNavitems from './nav-items/MobileNavitems'
import PrimaryNavitems from './nav-items/PrimaryNavitems'
import { useSelectedNavItem } from './nav-items/useSelectedNavItem'

const Navbar = () => {
  const adminBanner = ADMIN_BANNER_ROUTE
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const {selectedNameId, updateSelectedNameId} = useSelectedNavItem()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const session = useSessionUCMS()
  const path = usePathname();
  // const isMobile = useIsMobile();

  ReactGA.initialize(`${REACT_GA_REPORT}`);

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

  const toggleMobileNav = (): void => {
    setMobileNavOpen((prevOpen) => !prevOpen)
  }

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
            'usa-nav-container display-flex flex-align-center flex-justify maxw-full margin-top-2'
          }
        >
          <div
            className={`usa-navbar ${styles['mobile-border--none']}`}
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
            {/* <NavMenuButton
              label="Menu"
              onClick={toggleMobileNav}
              className="usa-menu-btn margin-left-auto"
            /> */}
          </div>
          {isAuthenticated ? (
            <PrimaryNavitems toggleMobileNav={toggleMobileNav}
              mobileExpanded={mobileNavOpen} />
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
                    onClick={() => updateSelectedNameId(header.id)}
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
        <MobileNavitems mobileExpanded={mobileNavOpen} toggleMobileNav={toggleMobileNav} />
      ) : isAuthenticated ? <>
        <AuthenticatedNavitems  mobileExpanded={mobileNavOpen} toggleMobileNav={toggleMobileNav} />
      </> : (
        <>
        </>
      )}
    </>
  )
}
export default Navbar
