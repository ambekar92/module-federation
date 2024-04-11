import { useState } from 'react'
import styles from './NotificationMenu.module.scss'
import { Badge, Divider, IconButton } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const tempNotifications = new Array(5).fill(0).map((el) => ({
    name: 'Goal Reached',
    message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    linkMessage: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    time: `${Math.floor(Math.random() * 60)} mins ago`,
  }))

  return (
    <div>
      <IconButton
        aria-label="notifications"
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleNotificationMenuOpen}
        color="inherit"
        size="large"
      >
        <Badge badgeContent={12} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        className="notification-menus"
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>
          <Typography variant="subtitle1" color="textPrimary">
            Notifications
          </Typography>
        </MenuItem>
        <Divider />

        {tempNotifications.map((notification, index) => (
          <>
            <MenuItem key={index}>
              <div className={styles.menuItem}>
                <AccountCircle className={styles.profileImg} />
              </div>
              <div>
                <div className={styles.title}>
                  <span className={styles.name}> {notification.name} </span>
                  <div className={styles.actionIcons}>
                    <MailOutlineOutlinedIcon />
                    <DeleteOutlineOutlinedIcon />
                  </div>
                </div>
                <p className={styles.description}>{notification.message}</p>
                <p className={styles.description}>
                  <a href="#">Link</a>: {notification.linkMessage}
                </p>
                <p className={styles.timeDuration}> {notification.time}</p>
              </div>
            </MenuItem>
            <Divider />
          </>
        ))}
      </Menu>
    </div>
  )
}

export default NotificationMenu
