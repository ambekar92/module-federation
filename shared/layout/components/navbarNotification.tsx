'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styles from './navbarNotification.module.scss'
import { Grid, GridContainer } from '@trussworks/react-uswds'
// Icons
import AccountCircle from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

//API
import Service from '../../../services/fetcher';

// Data
import notificationData from './notificationData.json'

//Icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';
import PushPinIcon from '@mui/icons-material/PushPin';
import { IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import DraftsIcon from '@mui/icons-material/Drafts';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'


export const Notification: React.FC = () => {

  const [getMenuFilter, setMenuFilter] = useState<HTMLElement | null>(null)
  const [getMenu, setMenu] = useState<HTMLElement | null>(null)
  const [filterReadMenu, setFilterReadMenu] = useState(false);
  const [filterUnreadMenu, setFilterUnreadMenu] = useState(false);

  const [showFilterReadUnread, setShowFilterReadUnread] = useState(false);
  const [showMarkReadUnread, setShowMarkReadUnread] = useState(false);

  const open = Boolean(getMenu)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowMarkReadUnread(!showMarkReadUnread);
    setShowFilterReadUnread(false);
  }
  const handleMarkAllRead = () => {
    setMarkAsAllUnReadStatus(false)
    setMarkAsAllReadStatus(true)
    setFilterReadMenu(false)
    setFilterUnreadMenu(false)
  }
  const handleMarkAllUnRead = () => {
    setMarkAsAllUnReadStatus(true)
    setMarkAsAllReadStatus(false)
    setFilterReadMenu(false)
    setFilterUnreadMenu(false)
  }

  const openFilter = Boolean(getMenuFilter)
  const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setShowFilterReadUnread(!showFilterReadUnread);
    setShowMarkReadUnread(false);
  }

  const handleCloseFilterMenu = () => {
    setFilterReadMenu(false)
    setFilterUnreadMenu(false)
  }
  const handleSelectFilter = (item: any) => {
    if (item !== 'Read') {
      setFilterReadMenu(false)
      setFilterUnreadMenu(true)
      setMenuFilter(null)
    } else {
      setFilterUnreadMenu(false)
      setFilterReadMenu(true)
      setMenuFilter(null)
    }
    setShowFilterReadUnread(false)
  }


  const dataFetchedRef = useRef(false)
  const [getNotificationData, setNotificationData] = useState<any>([])
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [markAsAllReadStatus, setMarkAsAllReadStatus] = useState(false);
  const [markAsAllUnReadStatus, setMarkAsAllUnReadStatus] = useState(true);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return
    }
    dataFetchedRef.current = true
    fetchNotificationData() // Calling only once
  }, [])

  const fetchNotificationData = async () => {
    const user_id = 1
    const response = await Service.getNotifications(user_id)
    setNotificationData(response?.data)
  }

  const handleToggleIcon = (id: any) => {
    setVisibleIcons((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const markAsAllRead = async () => {
    setMarkAsAllUnReadStatus(false)
    setMarkAsAllReadStatus(true)
  }

  const markAsAllUnRead = async () => {
    setMarkAsAllUnReadStatus(true)
    setMarkAsAllReadStatus(false)
  }

  return (
    <>

      <div className="line-height-mono-4">

        <Grid row className='margin-1'>
          <Grid
            col={5}
            className="display-flex"
          >
            <h3 className='flex-fill margin-0'>Notifications
              <span className={styles['notification-count']}>20</span>
            </h3>
          </Grid>

          <Grid col={3}>
            {/* filter Selected */}
            <div className='display-flex flex-column'>
              {filterReadMenu &&
                <div className={styles['filterSelected']}>
                  <IconButton
                    id="fade-button"
                    aria-controls={openFilter ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openFilter ? 'true' : undefined}
                    className={styles['notification-mainMenu']}
                    disableRipple
                  >
                    <DraftsIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    id="fade-button"
                    aria-controls={openFilter ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openFilter ? 'true' : undefined}
                    onClick={handleCloseFilterMenu}
                    className={styles['notification-mainMenu']}
                    disableRipple
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              }

              {filterUnreadMenu &&
                <div className={styles['filterSelected']}>
                  <IconButton
                    id="fade-button"
                    aria-controls={openFilter ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openFilter ? 'true' : undefined}
                    className={styles['notification-mainMenu']}
                    disableRipple
                  >
                    <EmailIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    id="fade-button"
                    aria-controls={openFilter ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openFilter ? 'true' : undefined}
                    onClick={handleCloseFilterMenu}
                    className={styles['notification-mainMenu']}
                    disableRipple
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              }
            </div>
          </Grid>

          <Grid col={2}>
            {/* filter */}
            <div className='display-flex flex-column'>
              <IconButton
                id="fade-button"
                aria-controls={openFilter ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFilter ? 'true' : undefined}
                onClick={handleClickFilter}
                className={styles['notification-mainMenu']}
                disableRipple
              >
                <FilterListIcon />
              </IconButton>
            </div>
          </Grid>

          <Grid col={2}>
            {/* More */}
            <div className='display-flex flex-column'>
              <IconButton
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles['notification-mainMenu']}
                disableRipple
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          </Grid>

          {showFilterReadUnread &&
            <>
              <Grid col={6}>
                <div className={styles['navFilterMenu']} onClick={() => handleSelectFilter('Read')}>
                  Read
                </div>
              </Grid>
              <Grid col={6}>
                <div className={styles['navFilterMenu']} onClick={() => handleSelectFilter('Unread')}>
                  Unread
                </div>
              </Grid>
            </>
          }

          {showMarkReadUnread &&
            <>
              <Grid col={6}>
                <div className={styles['navFilterMenu']} onClick={handleMarkAllRead}>
                  Mark All As Read
                </div>
              </Grid>
              <Grid col={6}>
                <div className={styles['navFilterMenu']} onClick={handleMarkAllUnRead}>
                  Mark All As Unread
                </div>
              </Grid>
            </>
          }
        </Grid>


        {notificationData.data?.map((item, index) => {
          return (
            <div key={index} className={styles['notification-lineItem']} onClick={() => handleToggleIcon(item.id)}>
              <hr />
              <Grid row>
                <Grid
                  col={2}
                  className="display-flex flex-justify-center flex-align-center"
                >
                  <AccountCircle
                    className={`height-6 width-6 ${styles['icons-account']}`}
                  />
                </Grid>
                <Grid col={9}>
                  <h4 className={`margin-0 ${styles['title-description']}`}>{item.title}</h4>
                  <p className={`margin-0 ${styles['title-description']}`}>{item.description}</p>
                  <h6 className={`margin-0 text-normal ${styles['text-h6']}`}>
                    {item.created_at}
                  </h6>
                </Grid>
                <Grid
                  col={1}
                  className="display-flex flex-justify-center flex-align-center"
                >
                  {(markAsAllUnReadStatus) &&
                    <>
                      {visibleIcons[item.id] ? <RadioButtonUncheckedIcon /> : <FiberManualRecordIcon className={styles['notify-status']} />}
                    </>
                  }
                  {(markAsAllReadStatus) &&
                    <>

                    </>
                  }
                </Grid>
              </Grid>
              
            </div>
          )
        })}
      </div>
    </>
  )
}
