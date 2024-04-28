'use client'
import React from 'react'
import { CardLayout } from './Card'
import { systemUCP } from '../adminucp/constants'
import styles from './Card.module.scss'
import {
  GridContainer,
  Grid,

} from '@trussworks/react-uswds'

export default function Ucp(): JSX.Element {
  return (
    <div>
      <GridContainer>
        <Grid row>
          <div className={styles['header-title']}>
            System Configuration
          </div>
        </Grid>
        <Grid row>
          {systemUCP.slice(0, 4).map((card) => (
            <CardLayout key={card.id} {...card} />
          ))}
        </Grid>
        <Grid row className={styles['usa-spacing-rows']}>
          {systemUCP.slice(4).map((card) => (
            <CardLayout key={card.id} {...card} />
          ))}
        </Grid>
      </GridContainer>
    </div>
  )
}
