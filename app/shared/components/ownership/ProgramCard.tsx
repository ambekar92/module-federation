import React from 'react'

interface CardType {
	program: string,
	description: string,
	input?: JSX.Element,
	details?: string,
	className?: string
}

const ProgramCard = ({ program, description, input, className = '', details }: CardType) => {
  return (
    <div className={`disadvantage-card ${className}`}>
      <div className="card-header">
        <h2>{ program }</h2>
        { input }
      </div>
      <div className={'padding-x-3 padding-y-2 margin-0 display-flex flex-column height-full flex-justify'}>
        <p>{ description }</p>
        {
          details && (
            <p>For further details and step-by-step guidance, please visit <a target="_blank" href={details} rel="noreferrer">here</a></p>
          )
        }
      </div>
    </div>
  )
}
export default ProgramCard
