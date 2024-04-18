'use client'
import { Grid, TextInput } from '@trussworks/react-uswds'
import React from 'react'
import styles from './UsersList.module.scss'

export const SearchBar = ({
  setSearchQuery,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div>
      <Grid row>
        <Grid
          mobile={{
            col: 12
          }}
          tablet={{
            col: 6
          }}
        >
          <h1 className={styles['user-management-title']}>User Management</h1>
        </Grid>
        <Grid
          mobile={{
            col: 12
          }}
          tablet={{
            col: 6
          }}
          className={styles['v-align-middle-float-right']}
        >
          <div>
            <label className="usa-sr-only" htmlFor="search-field-en-small">
              Search
            </label>
            <TextInput
              style={{
                borderColor: '#ABABAB',
                width: '350px',
                borderRadius: '4px 0 0 4px',
              }}
              id="search-field-en-small"
              placeholder="New Search"
              type="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              name="search"
            />
            <button className={styles['usa-search-blue-button']}>
              <img
                className={styles['usa-search-icon']}
                src="./search-icon.png"
                alt="search-button"
              />
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
