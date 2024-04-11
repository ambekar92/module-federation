'use client'
import React, { useState } from 'react'
import styles from './DocumentsList.module.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import filesData from './filesData.json'

//Icons
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DownloadIcon from '@mui/icons-material/Download';
import CreateIcon from '@mui/icons-material/Create';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function DocumentsListFiles() {

  const LoadCard = () => {
    const [getMenu, setMenu] = useState(null);
    const [selectedId, setSelectedId] = useState(Number);

    // Menu
    const open = Boolean(getMenu);
    const handleClick = (event: any) => {
      setMenu(event.currentTarget);
    };
    const handleClose = () => {
      setMenu(null);
    };

    return filesData.data?.map((item, index) => {
      return (
        <Grid item xs={3} key={index}>
          <Card
            onClick={() => setSelectedId(item.id)}
            className={selectedId && selectedId === item.id ? styles['cardSelected'] : styles["card"]}
          >
            <CardHeader
              action={
                <IconButton
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick} >
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.name}
              className={styles['card-headerText']}
            />
            <p className={styles['subText']}>{item.firstName} {item.lastName}</p>
            <p className={styles['subTextModified']}>{item.modified}</p>
          </Card>

          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={getMenu}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            className={styles['commonMenu']}
          >
            <MenuItem onClick={handleClose}>
              <DownloadIcon fontSize='small' />
              <span className={styles['menuText']}>Download</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CreateIcon fontSize='small' />
              <span className={styles['menuText']}>Rename</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ContentCopyIcon fontSize='small' />
              <span className={styles['menuText']}>Make A Copy</span>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ShortcutIcon fontSize='small' />
              <span className={styles['menuText']}>Share</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <DriveFileMoveIcon fontSize='small' />
              <span className={styles['menuText']}>Move</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <InfoOutlinedIcon fontSize='small' />
              <span className={styles['menuText']}>Info</span>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ArchiveIcon fontSize='small' />
              <span className={styles['menuText']}>Archive</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <DeleteOutlinedIcon fontSize='small' />
              <span className={styles['menuText']}>Delete</span>
            </MenuItem>
          </Menu>
        </Grid>
      )
    })
  }

  return (
    <div className={styles['documents-list-files']}>
      <h2>
        Files{' '}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </h2>

      <Grid container spacing={2}>
        <LoadCard />
      </Grid>

    </div>
  )
}

export default DocumentsListFiles
