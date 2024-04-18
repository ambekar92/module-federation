import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import NotificationMenu from '../components/notification-menu/NotificationMenu'
import UserProfileMenu from '../components/user-profile-menu/UserProfileMenu'
import styles from './layout.module.scss'

export default function Navbar() {
  return (
    <AppBar className={styles.nav}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Button
            id="demo-customized-button"
            className={styles.businessName}
            aria-controls={'Business Details'}
            aria-haspopup="true"
            variant="contained"
            disableElevation
            endIcon={<KeyboardArrowDownIcon />}
          >
            Business Name
          </Button>
        </div>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <NotificationMenu />
          <UserProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
