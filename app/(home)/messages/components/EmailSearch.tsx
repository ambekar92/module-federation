import React, { FC } from 'react'
import { EmailSearchLayoutProps } from '../utils/types'
import {
  Grid,
  TextInput
} from '@trussworks/react-uswds'
import styles from '../utils/Messages.module.scss'

export const EmailSearchLayout: FC<EmailSearchLayoutProps> = ({
  searchName,
  placeholder,

}) => {
  return (
    <Grid className="grid-row flex-row padding-top-1" row>
      <Grid
        className={`${styles['message-center-search']} mobile-lg:grid-col-3 desktop:grid-col-1 display-flex flex-align-center margin-left-1 padding-right-1`}
      >
        {searchName}
      </Grid>
      <Grid
        className={`${styles['message-center-search']}  flex-align-center  grid-col-10`}
      >
        <TextInput
          type='text'
          name='search-email'
          className={'maxw-full border-gray-10 '}
          id="keywords"
          placeholder={placeholder}
        />
      </Grid>
    </Grid>
  )
}
