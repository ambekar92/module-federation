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
import EmailIcon from '@mui/icons-material/Email'
import DraftsIcon from '@mui/icons-material/Drafts'
import GroupsIcon from '@mui/icons-material/Groups'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { Grid } from '@trussworks/react-uswds'
import { IconButton } from '@mui/material'

function NotificationHeader() {
  const [getMenu, setMenu] = useState<HTMLElement | null>(null)
  // Menu
  const open = Boolean(getMenu)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget)
  }
  const handleClose = () => {
    setMenu(null)
  }
  return (
    <div className='margin-top-3'>
      <div className='display-flex flex-justify-between flex-align-center'>
        <h1 className='flex-fill'>Notifications</h1>
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
            <MenuItem onClick={handleClose}>
              <RemoveRedEyeIcon className='margin-right-1' fontSize="small" />
              <span className={styles['menuText']}>Mark All As Read</span>
            </MenuItem>
          </Menu>
        </div>
      </div>

      <Grid row gap='lg'>
        <Grid col='auto'>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <DraftsIcon className={styles['mainMenuIcon']} /> <p className='margin-left-1'>Read</p>
          </button>
        </Grid>

        <Grid col='auto'>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <EmailIcon className={styles['mainMenuIcon']} /> <p className='margin-left-1'>Unread</p>
          </button>
        </Grid>

        <Grid col='auto'>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <GroupsIcon className={styles['mainMenuIcon']} />
            <p className='margin-left-1'>Contributor Invitations</p>
          </button>
        </Grid>

        <Grid col='auto'>
          <button
            className={`${styles['mainMenuButton']} display-flex flex-align-center padding-x-105 padding-y-1`}
          >
            <ConnectWithoutContactIcon className={styles['mainMenuIcon']} />{' '}
            <p className='margin-left-1'>RFI</p>
          </button>
        </Grid>
      </Grid>
    </div>
  )
}

export default NotificationHeader
