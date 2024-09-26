/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import styles from './NotificationList.module.scss'

//Icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Grid } from '@trussworks/react-uswds'
import { IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import DraftsIcon from '@mui/icons-material/Drafts';
import CloseIcon from '@mui/icons-material/Close';

function NotificationHeader(props:{cnt:number, selectMarkAsAllRead:()=>void, selectMarkAsAllUnRead:()=>void}) {
  const [getMenuFilter, setMenuFilter] = useState<HTMLElement | null>(null)
  const [getMenu, setMenu] = useState<HTMLElement | null>(null)
  const [filterReadMenu, setFilterReadMenu] = useState(false);
  const [filterUnreadMenu, setFilterUnreadMenu] = useState(false);

  const open = Boolean(getMenu)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget)
  }
  const handleClose = () => {
    setMenu(null)
  }
  const handleMarkAllRead = () => {
    props.selectMarkAsAllRead();
    setMenu(null)
  }
  const handleMarkAllUnRead = () => {
    props.selectMarkAsAllUnRead();
    setMenu(null)
  }

  const openFilter = Boolean(getMenuFilter)
  const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setMenuFilter(event.currentTarget)
  }
  const handleCloseFilter = () => {
    setMenuFilter(null)
  }

  const handleCloseFilterMenu = () => {
    setFilterReadMenu(false)
    setFilterUnreadMenu(false)
  }
  const handleSelectFilter = (item: any) => {
    if (item !== 'Read') {
      setFilterReadMenu(false)
      setFilterUnreadMenu(true)
      setMenuFilter(null)
    } else {
      setFilterUnreadMenu(false)
      setFilterReadMenu(true)
      setMenuFilter(null)
    }
  }

  return (
    <>
      <div className='display-flex flex-align-center'>
        <h1 className='flex-fill'>Notifications
          <span className={styles['notification-count']}>{props.cnt}</span>
        </h1>

        {/* filter Selected */}
        <div className='display-flex flex-column'>

          {filterReadMenu &&
            <div className={styles['filterSelected']}>
              <IconButton
                id="fade-button"
                aria-controls={openFilter ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFilter ? 'true' : undefined}
                className={styles['notification-mainMenu']}
              >
                <DraftsIcon fontSize="small" />
              </IconButton>
              <IconButton
                id="fade-button"
                aria-controls={openFilter ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFilter ? 'true' : undefined}
                onClick={handleCloseFilterMenu}
                className={styles['notification-mainMenu']}
              >
                <CloseIcon />
              </IconButton>
            </div>
          }

          {filterUnreadMenu &&
            <div className={styles['filterSelected']}>
              <IconButton
                id="fade-button"
                aria-controls={openFilter ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFilter ? 'true' : undefined}
                className={styles['notification-mainMenu']}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
              <IconButton
                id="fade-button"
                aria-controls={openFilter ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFilter ? 'true' : undefined}
                onClick={handleCloseFilterMenu}
                className={styles['notification-mainMenu']}
              >
                <CloseIcon />
              </IconButton>
            </div>
          }

        </div>

        {/* filter */}
        <div className='display-flex flex-column'>
          <IconButton
            id="fade-button"
            aria-controls={openFilter ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFilter ? 'true' : undefined}
            onClick={handleClickFilter}
            className={styles['notification-mainMenu']}
          >
            <FilterListIcon />
          </IconButton>

          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={getMenuFilter}
            open={openFilter}
            onClose={handleCloseFilter}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => handleSelectFilter('Read')} className={styles['menuSelect']}>
              <DraftsIcon className='margin-right-1' fontSize="small" />
              <span className={styles['menuText']}>Read</span>
            </MenuItem>
            <MenuItem onClick={() => handleSelectFilter('Unread')} className={styles['menuSelect']}>
              <EmailIcon className='margin-right-1' fontSize="small" />
              <span className={styles['menuText']}>Unread</span>
            </MenuItem>
          </Menu>
        </div>

        {/* More */}
        <div className='display-flex flex-column'>
          <IconButton
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles['notification-mainMenu']}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={getMenu}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleMarkAllRead} className={styles['menuSelect']}>
              <DraftsIcon className='margin-right-1' fontSize="small" />
              <span className={styles['menuText']}>Mark All As Read</span>
            </MenuItem>
            <MenuItem onClick={handleMarkAllUnRead} className={styles['menuSelect']}>
              <EmailIcon className='margin-right-1' fontSize="small" />
              <span className={styles['menuText']}>Mark All As Unread</span>
            </MenuItem>

          </Menu>
        </div>
      </div>

      {/* <Grid row gap='lg'>
        <Grid col={3}>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <EmailIcon className={styles['mainMenuIcon']} /> <p className='margin-left-1'>Messages</p>
          </button>
        </Grid>

        <Grid col={3}>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <CheckBoxIcon className={styles['mainMenuIcon']} /> <p className='margin-left-1'>Tasks</p>
          </button>
        </Grid>

        <Grid col={3}>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <VerifiedIcon className={styles['mainMenuIcon']} />
            <p className='margin-left-1'>Status Updates</p>
          </button>
        </Grid>

        <Grid col={3}>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <PushPinIcon className={styles['mainMenuIcon']} />{' '}
            <p className='margin-left-1'>Reminders</p>
          </button>
        </Grid>
      </Grid> */}
    </>
  )
}

export default NotificationHeader
