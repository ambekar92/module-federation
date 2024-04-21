/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewListIcon from '@mui/icons-material/ViewList'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@trussworks/react-uswds'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './NotificationList.module.scss'

//Icons
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import GroupsIcon from '@mui/icons-material/Groups';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


// Notification Lists
// import NotificationLists from './NotificationLists'


function NotificationHeader() {
  const [getMenu, setMenu] = useState<HTMLElement | null>(null);
  const [view, setView] = useState('card');
  const [getClass, setClass] = useState('usa-button--outline');
  const [getMainMenu, setMainMenu] = useState(0);

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  // Menu
  const open = Boolean(getMenu);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  const selectedCard = (value: any) => {
    setMainMenu(value)
  };

  return (
    <div className={styles['notification-header']}>
      <Grid container spacing={2}>
        <Grid item xs={11} md={11} lg={11}>
          <h1>Notifications</h1>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
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
                <RemoveRedEyeIcon fontSize='small' />
                <span className={styles['menuText']}>Mark All As Read</span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <EmailIcon fontSize='small' />
                <span className={styles['menuText']}>Mark All As Unread</span>
              </MenuItem>
            </Menu>

        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={5} md={2} lg={2} className={styles['mainMenu']}>
          <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
            <DraftsIcon /> <p>Read</p>
          </IconButton>
        </Grid>
        <Grid item xs={5} md={2} lg={2} className={styles['mainMenu']}>
          <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
            <EmailIcon /> <p>Unread</p>
          </IconButton>
        </Grid>
        <Grid item xs={5} md={3} lg={3} className={styles['mainMenu']}>
          <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
            <GroupsIcon /> <p>Contributor Invitations</p>
          </IconButton>
        </Grid>
        <Grid item xs={5} md={2} lg={2} className={styles['mainMenu']}>
          <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
            <ConnectWithoutContactIcon /> <p>RFI</p>
          </IconButton>
        </Grid>
      </Grid>



      {/* <NotificationLists /> */}

    </div >
  )
}

export default NotificationHeader
