'use client'
import React, { useState } from 'react'
import styles from './DocumentsList.module.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import filesData from './filesData.json'

function DocumentsListFiles() {

  const LoadCard = () => {

    return filesData.data?.map((item, index) => {
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
