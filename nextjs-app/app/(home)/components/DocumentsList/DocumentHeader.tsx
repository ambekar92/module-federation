'use client'
import React, { useState } from 'react'
import styles from './DocumentsList.module.scss'
import Grid from '@mui/material/Grid'
import { Button, ButtonGroup, Link } from '@trussworks/react-uswds'
import Image from 'next/image'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';

//Icons
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

// Card View
import DocumentsListFoldersCard from './DocumentsListFoldersCard'
import DocumentsListFilesCard from './DocumentsListFilesCard'

// Table View
import DocumentsListFoldersTable from './DocumentsListFoldersTable'
import DocumentsListFilesTable from './DocumentsListFilesTable'
import { IconButton } from '@mui/material'


function DocumentHeader() {

  const [view, setView] = useState('card');
  const [getClass, setClass] = useState('usa-button--outline');
  const [getMenu, setMenu] = useState(null);
  const [getMainMenu, setMainMenu] = useState(null);

  const handleViewChange = (newView: any) => {
    setView(newView);
  };

  // Menu
  const open = Boolean(getMenu);
  const handleClick = (event: any) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  const selectedCard = (value: any) => {
    setMainMenu(value)
  };

  return (
    <div className={styles['documents-header']}>
      <Grid container spacing={0}>
        <Grid item xs={6} md={2} lg={2}>
          <div>
            <Button
              type={'button'}
              style={{ height: "44px" }}
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Add New
            </Button>

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
                <FolderIcon fontSize='small' />
                <span className={styles['menuText']}>Folder</span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <UploadFileIcon fontSize='small' />
                <span className={styles['menuText']}>File Upload</span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <FolderOpenIcon fontSize='small' />
                <span className={styles['menuText']}>Folder Upload</span>
              </MenuItem>
            </Menu>

          </div>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <ul className="usa-button-group usa-button-group--segmented">
            <li className="usa-button-group__item">
              <button
                type="button"
                onClick={() => handleViewChange('table')}
                className={`usa-button ${view === 'table' ? "" : getClass}`}>
                <ViewListIcon fontSize="small" />
              </button>
            </li>
            <li className="usa-button-group__item">
              <button
                type="button"
                onClick={() => handleViewChange('card')}
                className={`usa-button ${view === 'card' ? "" : getClass}`}>
                <GridViewOutlinedIcon fontSize="small" />
              </button>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <section aria-label="Small search component">
            <form className="usa-search " role="search">
              <input
                className="search-textbox"
                type="text"
                name="search"
              />
              <Button type="button" style={{ padding: "8px", marginRight: "0px" }}>
                <Image
                  src="./search-white.svg"
                  alt="Search"
                  width={30}
                  height={27}
                />
              </Button>
            </form>
          </section>
        </Grid>
      </Grid>

      {/* justifyContent={"end"} */}
      <Grid container spacing={2} justifyContent={"end"}>
        {getMainMenu &&
          <>
            <Grid item xs={6} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
                <DownloadIcon /> <p>Download</p>
              </IconButton>
            </Grid>
            <Grid item xs={6} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
                <ShareIcon /> <p>Share</p>
              </IconButton>
            </Grid>
            <Grid item xs={6} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
                <EastOutlinedIcon /> <p>Move</p>
              </IconButton>
            </Grid>
            <Grid item xs={6} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
                <TimerOutlinedIcon /> <p>Archive</p>
              </IconButton>
            </Grid>
            <Grid item xs={6} md={1} lg={1} className={styles['mainMenu']}>
              <IconButton size="small" color="inherit" className={styles['mainMenuButton']}>
                <DeleteIcon /> <p>Delete</p>
              </IconButton>
            </Grid>

            <Grid item xs={6} md={1} lg={1} className={styles['mainMenu']}></Grid>
          </>
        }

        <Grid item xs={6} md={2} lg={2} style={{ marginTop: "12px" }}>
          <div className="usa-combo-box">
            <select className="usa-select" name="sort" id="sort" data-placeholder="asd">
              <option>Sort</option>
              <option value="Name">Name</option>
              <option value="LastEdit">Last Edit</option>
              <option value="Creation">Creation</option>
              <option value="Type">Type</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={6} md={2} lg={2} style={{ marginTop: "12px" }}>
          <div className="usa-combo-box">
            <select className="usa-select" name="type" id="type" data-placeholder="asd">
              <option>Type</option>
              <option value="PDF">PDF</option>
              <option value="DOC">DOC</option>
              <option value="Images">Images</option>
            </select>
          </div>
        </Grid>
      </Grid>

      {
        view === 'card' && (
          <div>
            <DocumentsListFoldersCard />
            <DocumentsListFilesCard selectedCardId={selectedCard} />
          </div>
        )
      }
      {
        view === 'table' && (
          <div>
            <DocumentsListFoldersTable />
            <DocumentsListFilesTable />
          </div>
        )
      }

    </div >
  )
}

export default DocumentHeader
