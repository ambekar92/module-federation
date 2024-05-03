/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect, useRef } from 'react'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewListIcon from '@mui/icons-material/ViewList'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@trussworks/react-uswds'
import Image from 'next/image'
import styles from './DocumentsList.module.scss'

//Icons
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import ShareIcon from '@mui/icons-material/Share'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import UploadFileIcon from '@mui/icons-material/UploadFile'

// Card View
import DocumentsListFilesCard from './DocumentsListFilesCard'
import DocumentsListFoldersCard from './DocumentsListFoldersCard'

// Table View
import { IconButton } from '@mui/material'
import DocumentsListFilesTable from './DocumentsListFilesTable'
import DocumentsListFoldersTable from './DocumentsListFoldersTable'

//API
import Service from '../../../services/fetcher'

function DocumentHeader() {
  const dataFetchedRef = useRef(false)
  const [setDocumentsData] = useState<any>([])
  const [errorInfo, setErrorInfo] = useState<any>('')
  const [view, setView] = useState('card')
  const [menu, setMenu] = useState<HTMLElement | null>(null)
  const [mainMenu, setMainMenu] = useState(0)
  const getClass = 'usa-button--outline'
  const handleViewChange = (newView: string) => {
    setView(newView)
  }

  // Menu
  const open = Boolean(menu)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget)
  }
  const handleClose = () => {
    setMenu(null)
  }
  const selectedCard = (value: any) => {
    setMainMenu(value)
  }

  // API Call
  useEffect(() => {
    if (dataFetchedRef.current) {
      return
    }
    dataFetchedRef.current = true
    fetchDocumentsData() // Calling only once
  }, [])

  const fetchDocumentsData = async () => {
    const user_id = 1;
    try {
      const response = await Service.getDocuments(user_id);
      setDocumentsData(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorInfo(error.message);
      } else {
        // Handles unexpected error format
        setErrorInfo('An unexpected error occurred');
      }
    }
  }

  return (
    <div className={styles['documents-header']}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2} lg={2}>
          <div>
            <Button
              type={'button'}
              style={{ height: '44px' }}
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
        <Grid item xs={6} md={3} lg={3}>
          <ul className="usa-button-group usa-button-group--segmented">
            <li className="usa-button-group__item">
              <button
                type="button"
                onClick={() => handleViewChange('table')}
                className={`usa-button ${view === 'table' ? '' : getClass}`}
              >
                <ViewListIcon fontSize="small" />
              </button>
            </li>
            <li className="usa-button-group__item">
              <button
                type="button"
                onClick={() => handleViewChange('card')}
                className={`usa-button ${view === 'card' ? '' : getClass}`}
              >
                <GridViewOutlinedIcon fontSize="small" />
              </button>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <section aria-label="Small search component">
            <form className="usa-search " role="search">
              <input className="search-textbox" type="text" name="search" />
              <Button type="button" className="margin-right-0 padding-1">
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

      {view === 'card' && (
        <div>
          <DocumentsListFoldersCard />
          <DocumentsListFilesCard selectedCardId={selectedCard} />
        </div>
      )}
      {view === 'table' && (
        <div>
          <DocumentsListFoldersTable />
          <DocumentsListFilesTable />
        </div>
      )}
    </div>
  )
}

export default DocumentHeader
