'use client'
import React, { FC } from 'react'
import { CardLayoutProps } from '../adminucp/types'
import {
  Grid,
  Card,
  CardBody,
  CardFooter,
  Link,
} from '@trussworks/react-uswds'
import styles from './Card.module.scss'

export const CardLayout: FC<CardLayoutProps> = ({
  bodyDescription,
  buttonName,
  iconName,
}) => {
  return (
    <Grid col={3}>
      <div>
        <div className ={styles['usa-image']}>
          <img
            className={styles['usa-information-icon']}
            src={iconName}
            alt="information-icon"
          />
        </div>
        <div className = {styles['usa-card']}>
          <Card>
            <CardBody className={styles['usa-cardbody-spacing']}>
              <p> {bodyDescription}</p>
            </CardBody>
            <CardFooter className={styles['usa-button-center']}>
              <Link
                href={'#'}
                variant="unstyled"
                className="usa-button"
              >
                {buttonName}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Grid>
  )
}
