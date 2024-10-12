import { SBA_LOGO_SQUARE_WHITE_URL } from '@/app/constants/icons'
import { GET_HELP_ROUTE, USER_PROFILE_PAGE } from '@/app/constants/url'
import { logout } from '@/app/lib/logout'
import { Button, Icon, Link, Menu, PrimaryNav } from '@trussworks/react-uswds'
import React, { useState } from 'react'
import styles from '../Layout.module.scss'
import { NavbarNotification } from '../navbar-notification/NavbarNotification'
import useSWR from 'swr'
import { GET_NOTIFICATIONS_ROUTE } from '@/app/constants/local-routes'
import { INotification } from '@/app/services/types/communication-service/Notification'
import { useSessionUCMS } from '@/app/lib/auth'
const styleSettings = {
  hoverColor: '',
  bg: '#002e6d',
  textColor: 'text-white',
  logo: SBA_LOGO_SQUARE_WHITE_URL,
}

const PrimaryNavitems = ({
  toggleMobileNav,
  mobileExpanded,
}: {
  toggleMobileNav: any
  mobileExpanded: boolean
}) => {
  const session = useSessionUCMS()
  const { data: notificationData } = useSWR<INotification[]>(
    session.data.user.id
      ? `${GET_NOTIFICATIONS_ROUTE}?user_id=${session.data.user.id}`
      : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      errorRetryCount: 5,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 5) {
          return
        }
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    },
  )
  const [openProfile, setOpenProfile] = useState([false, false])
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
    await logout()
  }

  const profileDropdown = [
    <>
      <Link key="one" href={USER_PROFILE_PAGE}>
        Profile
      </Link>
      ,
      <Button
        unstyled
        type="button"
        key="two"
        style={{ color: 'white', fontWeight: 'normal' }}
        onClick={() => logout()}
      >
        Logout
      </Button>
    </>,
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
          {notificationData && Array.isArray(notificationData) && notificationData.some(notification => notification.unread) && (
            <span style={{ position: 'relative', top: '2px', right: '5px' }}>
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#E41D3D',
                }}
              ></div>
            </span>
          )}
          <span className='margin-left-05'>
						Notifications
          </span>
          <Icon.ExpandMore
            className="top-2px margin-left-05"
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

    <a key="primaryNav_2" className="usa-nav__link" href={GET_HELP_ROUTE}>
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
