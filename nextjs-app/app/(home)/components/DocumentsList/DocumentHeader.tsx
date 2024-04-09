'use client'
import React, { useState } from 'react'
import styles from './DocumentsList.module.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { Button, ButtonGroup, Link } from '@trussworks/react-uswds'
import Image from 'next/image'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';

// Card View
import DocumentsListFoldersCard from './DocumentsListFoldersCard'
import DocumentsListFilesCard from './DocumentsListFilesCard'

// Table View
import DocumentsListFoldersTable from './DocumentsListFoldersTable'
import DocumentsListFilesTable from './DocumentsListFilesTable'


function DocumentHeader() {

  const [view, setView] = useState('card');
  const [getClass, setClass] = useState('usa-button--outline');

  const handleViewChange = (newView: any) => {
    setView(newView);
  };

  return (
    <div className={styles['documents-header']}>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <div>
            <Button type={'button'} style={{ height: "44px"}}>
              Add
            </Button>
          </div>
        </Grid>
        <Grid item xs={3}>
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
        <Grid item xs={8}>
          <section aria-label="Small search component">
            <form className="usa-search " role="search">
              <input
                className="search-textbox"
                type="text"
                name="search"
              />
              <Button type="button" style={{ padding: "8px", marginRight: "0px" }}>
                <Image
                  src="./search--white.svg"
                  alt="Search"
                  width={30}
                  height={27}
                />
              </Button>
            </form>
          </section>

          <section aria-label="Small search component">
            <Grid container spacing={2} justifyContent={"end"}>
              <Grid item xs={2}>
                <div className="usa-combo-box">
                  <select className="usa-select" name="fruit" id="fruit" data-placeholder="asd">
                    <option>Sort</option>
                    <option value="apple">Apple</option>
                    <option value="apricot">Apricot</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="usa-combo-box">
                  <select className="usa-select" name="fruit" id="fruit" data-placeholder="asd">
                    <option>Type</option>
                    <option value="apple">Apple</option>
                    <option value="apricot">Apricot</option>
                  </select>
                </div>
              </Grid>
            </Grid>
          </section>

        </Grid>
      </Grid>

      {view === 'card' && (
        <div>
          <DocumentsListFoldersCard />
          <DocumentsListFilesCard />
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
