import React from 'react'

interface CardType {
	program: string,
	description: string,
	input?: JSX.Element,
	className?: string
}

const ProgramCard = ({ program, description, input, className = '' }: CardType) => {
  return (
    <div className={`disadvantage-card ${className}`}>
      <div className="card-header">
        <h2>{ program }</h2>
        { input }
      </div>
      <p className={'card-content'}>
        { description }
      </p>
    </div>
  )
}
export default ProgramCard
