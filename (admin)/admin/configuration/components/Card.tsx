import React, { FC } from 'react'
import { CardLayoutProps } from '../utils/types'
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
    <Grid tablet={{col: 6}} desktop={{col: 4}} className={`margin-bottom-2 ${styles['usa-card']}`}>
      <div className ={styles['usa-image']}>
        <img
          className={styles['usa-information-icon']}
          src={iconName}
          alt="information-icon"
        />
      </div>
      <div className = {styles['usa-card']}>
        <Card>
          <CardBody className="margin-top-5 margin-bottom-2">
            <p> {bodyDescription}</p>
          </CardBody>
          <CardFooter className='display-flex flex-justify-center flex-align-center'>
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
    </Grid>
  )
}
