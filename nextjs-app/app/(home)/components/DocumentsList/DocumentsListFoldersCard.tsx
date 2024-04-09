'use client'
import React, { useState } from 'react'
import styles from './DocumentsList.module.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import foldersData from './foldersData.json'

function DocumentsListFolders() {

  const LoadCard = () => {
    return foldersData.data?.map((item, index) => {
      return (
        <Grid item xs={3} key={index}>
          <Card className={styles['card']}>
            <CardHeader
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.name}
              className={styles['card-headerText']}
            />
          </Card>
        </Grid>
      )
    })
  }

  return (
    <div className={styles['documents-list-folders']}>
      <h2>
        Folders{' '}
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

export default DocumentsListFolders
