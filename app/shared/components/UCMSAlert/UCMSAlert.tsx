import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  title: string
  text: string | ReactElement | ReactElement[]
  pallette?: 'grey' | 'blue' // add custom palette that do not fit the default uswds alert colors
  styles?: React.CSSProperties
}

const UCMSAlert = ({ text, title, styles }: Props) => {
  return (
    <div className="usa-alert usa-alert">
      <div className="usa-alert__body" style={styles}>
        <div className="margin-left-1">
          <div className="display-flex flex-row flex-align-center">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{ width: '2rem', marginRight: '1rem' }}
            />
            <h4 className="usa-alert__heading">{title}</h4>
          </div>
          <div className="usa-alert__text">{text}</div>
        </div>
      </div>
    </div>
  )
}

export default UCMSAlert
