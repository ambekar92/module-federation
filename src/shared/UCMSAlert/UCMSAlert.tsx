import { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  title: string,
  text: string | ReactElement | ReactElement[],
  pallette: 'grey' | 'blue' // add custom palette that do not fit the default uswds alert colors
}

const UCMSAlert = ({ text, title, pallette }: Props) => {
  return (
    <div className="usa-alert usa-alert">
      <div className="usa-alert__body flex-display flex-row">
        <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
        <div className='margin-left-1'>

          <h4 className="usa-alert__heading">
            {title}
          </h4>
          <div className="usa-alert__text">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UCMSAlert