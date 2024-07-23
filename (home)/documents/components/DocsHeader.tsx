'use client'
import { Dispatch, SetStateAction } from 'react';
import styles from '../utils/DocumentsList.module.scss';
import Image from 'next/image'

//Icons
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ShareIcon from '@mui/icons-material/Share';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from '@mui/material'

import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { Grid, Menu, MenuItem } from '@mui/material';
import { Button } from '@trussworks/react-uswds';

interface DocsHeaderProps {
  mainMenu: number;
  setMainMenu: Dispatch<SetStateAction<number>>;
  setMenu: Dispatch<SetStateAction<HTMLElement | null>>;
  menu: HTMLElement | null;
}

function DocsHeader({ mainMenu, setMainMenu, setMenu, menu }: DocsHeaderProps) {
  const open = Boolean(menu);
  const handleClose = () => {
    setMenu(null)
  }
  const selectedCard = (value: number) => {
    setMainMenu(value)
  }

  return (
    <div className={styles['documents-header']}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
          <div>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={menu}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>
                <FolderIcon fontSize="small" />
                <span className={styles['menuText']}>Folder</span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <UploadFileIcon fontSize="small" />
                <span className={styles['menuText']}>File Upload</span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <FolderOpenIcon fontSize="small" />
                <span className={styles['menuText']}>Folder Upload</span>
              </MenuItem>
            </Menu>
          </div>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <section aria-label="Small search component">
            <form className="usa-search display-flex flex-align-center" role="search">
              <input className="usa-input maxw-full radius-lg margin-top-0" type="text" name="search" />
              <Button type="button" className="margin-right-0 padding-105 height-full radius-left-0">
                <Image
                  src="./search-white.svg"
                  alt="Search"
                  width={30}
                  height={30}
                />
              </Button>
            </form>
          </section>
        </Grid>
      </Grid>

      {mainMenu !== 0 && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={3} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton
                size="small"
                color="inherit"
                className={styles['mainMenuButton']}
              >
                <DownloadIcon /> <p>Download</p>
              </IconButton>
            </Grid>
            <Grid item xs={3} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton
                size="small"
                color="inherit"
                className={styles['mainMenuButton']}
              >
                <ShareIcon /> <p>Share</p>
              </IconButton>
            </Grid>
            <Grid item xs={3} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton
                size="small"
                color="inherit"
                className={styles['mainMenuButton']}
              >
                <EastOutlinedIcon /> <p>Move</p>
              </IconButton>
            </Grid>
            <Grid item xs={3} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton
                size="small"
                color="inherit"
                className={styles['mainMenuButton']}
              >
                <TimerOutlinedIcon /> <p>Archive</p>
              </IconButton>
            </Grid>
            <Grid item xs={3} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton
                size="small"
                color="inherit"
                className={styles['mainMenuButton']}
              >
                <DeleteIcon /> <p>Delete</p>
              </IconButton>
            </Grid>

            <Grid
              item
              xs={1}
              md={1}
              lg={1}
              className={styles['mainMenu']}
            ></Grid>
          </Grid>
        </>
      )}

      <Grid
        container
        spacing={2}
        justifyContent={'end'}
        className={mainMenu ? styles['sortTypeGrid'] : ''}
      >
        <Grid item xs={6} md={2} lg={2} className="margin-top-105">
          <div className="usa-combo-box">
            <select
              className="usa-select"
              name="sort"
              id="sort"
              data-placeholder="sort"
            >
              <option>Sort</option>
              <option value="Name">Name</option>
              <option value="LastEdit">Last Edit</option>
              <option value="Creation">Creation</option>
              <option value="Type">Type</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={6} md={2} lg={2} className="margin-top-105">
          <div className="usa-combo-box">
            <select
              className="usa-select"
              name="type"
              id="type"
              data-placeholder="sort"
            >
              <option>Type</option>
              <option value="PDF">PDF</option>
              <option value="DOC">DOC</option>
              <option value="Images">Images</option>
            </select>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default DocsHeader
