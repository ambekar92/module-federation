import AccountCircle from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const isMenuOpen = Boolean(anchorEl)
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={'profile-menu'}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={'menuId'}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </>
  )
}

export default UserProfileMenu
