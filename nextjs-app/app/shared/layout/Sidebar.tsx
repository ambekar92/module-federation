import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Icons
import HomeIcon from '@mui/icons-material/Home'
import ForumIcon from '@mui/icons-material/Forum'
import FolderIcon from '@mui/icons-material/Folder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import styles from './layout.module.scss'
const drawerWidth = 66

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        className={styles.layoutSidebar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#002e6d',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText>Messages</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText>Documents</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText>Saved</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
