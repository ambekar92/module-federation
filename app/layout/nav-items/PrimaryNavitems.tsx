import { SBA_LOGO_SQUARE_WHITE_URL } from '@/app/constants/icons';
import { USER_PROFILE_PAGE } from '@/app/constants/url';
import { logout } from '@/app/lib/logout';
import { Button, Icon, Link, Menu, PrimaryNav } from '@trussworks/react-uswds';
import React, { useState } from 'react';
import styles from '../Layout.module.scss';
import { NavbarNotification } from '../navbar-notification/NavbarNotification';

const styleSettings = {
  hoverColor: '',
  bg: '#002e6d',
  textColor: 'text-white',
  logo: SBA_LOGO_SQUARE_WHITE_URL,
}

const PrimaryNavitems = ({toggleMobileNav, mobileExpanded}: {toggleMobileNav: any, mobileExpanded: boolean}) => {
  const [openProfile, setOpenProfile] = useState([false, false]);
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false])

  const handleToggleProfileDropdown = (index: number): void => {
    setOpenProfile((openProfile) => {
      const newOpenStateProfile = Array(openProfile.length).fill(true)
      newOpenStateProfile[index] = !openProfile[index]
      return newOpenStateProfile
    })
  }

  const handleToggleNavDropdown = (index: number): void => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(true)
      newOpenState[index] = !prevNavDropdownOpen[index]
      return newOpenState
    })
  }

  const handleSignOut = async () => {
    await logout();
  }

  const profileDropdown = [
    <>
      <Link key="one" href={USER_PROFILE_PAGE}>
      Profile
      </Link>,
      <Button unstyled
        type="button"
        key="two"
        style={{ color: 'white', fontWeight: 'normal' }}
        onClick={() => logout()}>
      Logout
      </Button>
    </>
  ]

  const navitems = [
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

    <a key="primaryNav_2" className="usa-nav__link" href="/help">
      <span className={styleSettings.textColor}>Get Help</span>
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

  return (
    <PrimaryNav
      aria-label="Primary navigation"
      items={navitems}
      mobileExpanded={mobileExpanded}
      onToggleMobileNav={toggleMobileNav}
    />
  )
}

export default PrimaryNavitems
