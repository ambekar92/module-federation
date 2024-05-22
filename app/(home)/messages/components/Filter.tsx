import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import Styles from './forms.module.scss'

interface FilterProps {
  id: string
  column: string
  dot: string
  icon: string
  title: string
}
const Filter = [
  {
    id: '1',
    column: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_cuurent_line.png"
        alt="read_mail"
      />
    ),
    dot: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_dot_circle.png"
        alt="read_mail"
      />
    ),
    icon: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_marked_as_read.png"
        alt="read_mail"
      />
    ),
    title: 'Mark as Read',
  },
  {
    id: '2',
    column: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_cuurent_line.png"
        alt="read_mail"
      />
    ),
    dot: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_dot_circle.png"
        alt="read_mail"
      />
    ),
    icon: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_marked_as_unread.png"
        alt="unread_mail"
      />
    ),
    title: 'Mark as Unread',
  },
  {
    id: '3',
    column: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_cuurent_line.png"
        alt="read_mail"
      />
    ),
    dot: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_dot_circle.png"
        alt="read_mail"
      />
    ),
    icon: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_important.png"
        alt="important_mail"
      />
    ),
    title: 'Important',
  },
]
const FilterList: React.FC = () => {
  return (
    <>
      {Filter.map((item, index) => (
        <div key={item.id}>
          <Grid  className={Styles['row-spaces']} row>
            <Grid className={`${Styles['email-dot']}`}>{item.dot}</Grid>

            <Grid className={`${Styles['email-image']}`}>{item.icon}</Grid>

            <Grid className={`${Styles['email-title']}`}>{item.title}</Grid>
          </Grid>

          {index !== Filter.length - 1 && <div className={Styles['line']} />}
        </div>
      ))}
    </>
  )
}

export default FilterList
