import React from 'react'
import { CardLayout } from './Card'
import { systemUCP } from './utils/constants'
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
          {systemUCP.map((card) => (
            	<CardLayout key={card.id} {...card} />
          ))}
        </Grid>
      </GridContainer>
    </div>
  )
}
