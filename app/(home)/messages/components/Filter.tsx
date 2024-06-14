import React from 'react'
import { Button, Grid } from '@trussworks/react-uswds'
import Styles from '../utils/forms.module.scss'
import { filterItems } from '../utils/constants'

const FilterList: React.FC = () => {
  return (
    <>
      {filterItems.map((item, index) => (
        <Button type='button' unstyled key={item.id} className='padding-0 text-base-dark text-no-underline maxw-full width-full'>
          <Grid className='padding-y-05 flex-align-center' row gap='md'>
            <Grid col={2} className={`${Styles['email-image']} flex-justify-end display-flex flex-align-center padding-top-0`}>{item.icon}</Grid>

            <Grid col={10} className={`${Styles['email-title']}`}>
              <span className='text-bold'>
                {item.title}
              </span>
            </Grid>
          </Grid>

          {index !== filterItems.length - 1 && <div className={Styles['line']} />}
        </Button>
      ))}
    </>
  )
}

export default FilterList
