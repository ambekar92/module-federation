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
  SBA_LOGO_SQUARE_BLUE_RED_URL,
  SBA_LOGO_SQUARE_WHITE_URL,
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

const Navigation = () => {
  const [adminBanner, setAdminBanner] = useState(ADMIN_BANNER_ROUTE)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false])
  const [styleSettings, setStyleSettings] = useState<StyleSetting>({
    bg: '',
    textColor: '',
    logo: SBA_LOGO_SQUARE_BLUE_RED_URL,
    hoverColor: '',
  })

  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      setStyleSettings({
        bg: 'bg-primary-darker',
        textColor: 'text-white',
        logo: SBA_LOGO_SQUARE_WHITE_URL,
        hoverColor: 'hover:text-primary',
      })
    }
  }, [status])

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
          {' Notifications '}
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

  return (
    <>
      <Header
        className={`${styleSettings.bg} border-bottom-1px border-base-light ${styles['mobile-border--none']}`}
        basic
        showMobileOverlay={mobileNavOpen}
      >
        <div
          className={
            'usa-nav-container display-flex flex-justify-between maxw-full'
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
          <PrimaryNav
            aria-label="Primary navigation"
            items={primaryNavItems}
            onToggleMobileNav={toggleMobileNav}
            mobileExpanded={mobileNavOpen}
          ></PrimaryNav>
        </div>
      </Header>
      <Header
        className={`${styleSettings.bg} border-bottom-1px border-base-lighter padding-x-4 ${styles['mobile-border--none']}`}
      >
        <div className="usa-nav float-left">
          <ul className="usa-nav__primary float-left usa-accordion">
            <li className="usa-nav__primary-item">
              <a className="usa-nav__link" href="/">
                <span
                  className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                >
                  Home
                </span>
              </a>
            </li>

            <li className="usa-nav__primary-item">
              {adminBanner === 'admin' ? (
                <a className="usa-nav__link" href="/admin/configuration">
                  <span
                    className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                  >
                    {' '}
                    System Configuration
                  </span>
                </a>
              ) : (
                <a className="usa-nav__link" href="/messages">
                  <span
                    className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                  >
                    {' '}
                    Messages
                  </span>
                </a>
              )}
            </li>

            <li className="usa-nav__primary-item">
              {adminBanner === 'admin' ? (
                <a className="usa-nav__link" href="/entities">
                  <span
                    className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                  >
                    {' '}
                   Entities
                  </span>
                </a>
              ) : (
                <a className="usa-nav__link" href="/documents">
                  <span
                    className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                  >
                    {' '}
                    Documents
                  </span>
                </a>
              )}
            </li>

            <li className="usa-nav__primary-item">
              {adminBanner === 'admin' ? (
                <a className="usa-nav__link" href="/users">
                  <span
                    className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                  >
                    {' '}
                    Users
                  </span>
                </a>
              ) : (
                <a className="usa-nav__link" href="/">
                  <span
                    className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                  >
                    {' '}
                    Saved
                  </span>
                </a>
              )}
            </li>

            <li className="usa-nav__primary-item">
              <a className="usa-nav__link" href="/">
                <span
                  className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                >
                  {adminBanner === 'admin' ? '' : 'Support'}
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="usa-nav float-right">
          <ul className="usa-nav__primary usa-accordion">
            <li className="usa-nav__primary-item">
              <a aria-disabled={true} tabIndex={-1} href="">
                <span
                  className={`${styleSettings.textColor} ${styleSettings.hoverColor}`}
                >
                  Business Name <Icon.ExpandMore className="top-2px" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Header>
    </>
  )
}

export default Navigation
