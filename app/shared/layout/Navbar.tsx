import React, { useState } from 'react'
import styles from './layout.module.scss'
import {
  Header,
  Title,
  Grid,
  Icon,
} from '@trussworks/react-uswds'

interface headerNames {
  id: string
  name: string
}
const headerNames = [
  { id: '1', name: 'Home' },
  { id: '2', name: 'Messages' },
  { id: '3', name: 'Documents' },
  { id: '4', name: 'Saved' },
  { id: '5', name: 'Support' },
]

const Navbar: React.FC = () => {
  const [selectedNameId, setSelectedNameId] = useState('')

  const handleClick = (id) => {
    setSelectedNameId(selectedNameId === id ? null : id)
    console.log(selectedNameId)
  }

  return (
    <Grid>
      <div>
        <Header className="shadow-2">
          <Grid row >
            <Grid
              className={` margin-bottom-0 margin-top-1 margin-left-1 flex-wrap flex-11 
              `}
            >
              <Title id="extended-logo">
                <img
                  src="/SBA-Logo-Horizontal.png"
                  alt="logo"
                  width="10%"
                />
              </Title>
            </Grid>

            <Grid className="desktop:flex-1  mobile-lg:flex-1 ">
              <a
                className={`${styles['icon-size']} padding-top-5 float-right margin-right-2`}
              >
                <Icon.AccountCircle />
              </a>
              <a
                className={`${styles['icon-size']} padding-top-5 float-right margin-right-2`}
              >
                <Icon.Notifications />
              </a>
            </Grid>
            <Grid className="desktop:flex-1 mobile-lg:flex-1  padding-top-6 float-right margin-right-2">
              <div className={styles['usa-nav_name']}>
                User Profile <Icon.ExpandMore />
              </div>
            </Grid>
          </Grid>
        </Header>
      </div>

      <Grid>
        <Header className="shadow-2">
          {' '}
          <Grid row>
            <Grid className={`${styles['names-container']} flex-8`}>
              <ul>
                {headerNames.map((name) => (
                  <li
                    key={name.id}
                    onClick={() => handleClick(name.id)}
                    className={`${styles['names-container']} ${
                      selectedNameId === name.id ? styles.selected : ''
                    } `}
                  >
                    {name.name}
                    {selectedNameId === name.id && (
                      <span className={`${styles['usa-arrow']}`}>
                        <Icon.ExpandMore />
                      </span>
                    )}
                    {/*  */}
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid className={`${styles['usa-nav_name']}`}>
              <div className="float-right margin-top-3 margin-right-2 flex-1">
                    Business Name
                <Icon.ExpandMore />
              </div>

            </Grid>
          </Grid>
        </Header>
      </Grid>
    </Grid>
  )
}
export default Navbar
