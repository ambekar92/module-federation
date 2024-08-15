import { useSessionUCMS } from '@/app/lib/auth';
import {
  Header,
  Icon,
  Menu,
  NavDropDownButton,
  NavMenuButton,
  PrimaryNav,
  Title
} from '@trussworks/react-uswds';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './layout.module.scss';
import { NavbarNotification } from './navbar-notification/NavbarNotification';
import {
  USER_PROFILE_PAGE
} from '@/app/constants/url'

const AuthenticatedNavigation = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false])
  const { status } = useSessionUCMS()

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
    <Link key="one" href={USER_PROFILE_PAGE}>
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
      <NavDropDownButton
        menuId="extended-nav-section-one"
        isOpen={navDropdownOpen[0]}
        label={'Notifications'}
        onToggle={(): void => {
          handleToggleNavDropdown(0)
        }}
        isCurrent
      />
      <Menu
        id="extended-nav-section-one"
        items={new Array(1).fill(<NavbarNotification />)}
        isOpen={navDropdownOpen[0]}
      />
    </React.Fragment>,

    <a key="primaryNav_2" className="usa-nav__link" href="#">
      Account
    </a>,

    <React.Fragment key="primaryNav_1">
      <NavDropDownButton
        menuId="extended-nav-section-two"
        isOpen={navDropdownOpen[1]}
        label={'User Profile'}
        onToggle={(): void => {
          handleToggleNavDropdown(1)
        }}
      />
      <Menu
        id="extended-nav-section-two"
        items={profileDropdown}
        isOpen={navDropdownOpen[1]}
      />
    </React.Fragment>,
  ]

  if (status === 'authenticated') {
    return (
      <>
        <Header className={`border-bottom-1px border-base-light ${styles['mobile-border--none']}`} basic showMobileOverlay={mobileNavOpen}>
          <div className={'usa-nav-container display-flex flex-justify-between maxw-full'}>
            <div className={`usa-navbar ${styles['mobile-border--none']} width-full`}>
              <Title id="extended-logo">
                <img
                  src="/SBA-Logo-Horizontal.png"
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
        <Header className={`border-bottom-1px border-base-lighter padding-x-4 ${styles['mobile-border--none']}`}>
          <div className="usa-nav float-left">
            <ul className="usa-nav__primary float-left usa-accordion">
              <li className="usa-nav__primary-item">
                <a className="usa-nav__link" href="/">Home</a>
              </li>

              <li className="usa-nav__primary-item">
                <a className="usa-nav__link" href="/messages">Messages</a>
              </li>

              <li className="usa-nav__primary-item">
                <a className="usa-nav__link" href="/documents">Documents</a>
              </li>

              <li className="usa-nav__primary-item">
                <a className="usa-nav__link" href="/">Saved</a>
              </li>

              <li className="usa-nav__primary-item">
                <a className="usa-nav__link" href="/">Support</a>
              </li>
            </ul>
          </div>
          <div className="usa-nav float-right">
            <ul className='usa-nav__primary usa-accordion'>
              <li className='usa-nav__primary-item'>
                <a aria-disabled={true} href="">Business Name <Icon.ExpandMore /></a>
              </li>
            </ul>
          </div>
        </Header>
      </>
    );
  }
}
export default AuthenticatedNavigation
