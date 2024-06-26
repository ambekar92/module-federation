'use client'
import React from 'react';

interface InitialsCircleProps {
  name: string;
}

const InitialsCircle: React.FC<InitialsCircleProps> = ({
  name,
}) => {
  const initials = name.split(' ').length > 1
    ? name
      .split(' ')
      .filter(part => part !== '')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
    : name.charAt(0).toUpperCase();

  return (
    <div
      className="initials-circle"
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#BDBDBD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 48 / 2.5,
      }}
    >
      {initials}
    </div>
  );
};

export default InitialsCircle;
