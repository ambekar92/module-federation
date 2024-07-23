import React from 'react';

interface CardType {
  program: string;
  description: string;
  input?: JSX.Element;
  details?: string;
  className?: string;
  onClick?: () => void;
}

const ProgramCard: React.FC<CardType> = ({ program, description, input, className = '', details, onClick }) => {
  return (
    <div className={`disadvantage-card cursor-pointer ${className}`} onClick={onClick}>
      <div className="card-header">
        <h2>{program}</h2>
        {input && (
          <div onClick={(e) => e.stopPropagation()}>
            {input}
          </div>
        )}
      </div>
      <div className="card-content">
        <p>{description}</p>
        {details && (
          <p>
            For further details and step-by-step guidance, please visit{' '}
            <a target="_blank" href={details} rel="noreferrer">
              here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
