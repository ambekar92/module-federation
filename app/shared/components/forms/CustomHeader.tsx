import React from 'react';

interface CustomHeaderProps {
    title: string; // Title for the h1 element
    children?: React.ReactNode; // Optional children to render in the div
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, children }) => {
  return (
    <div className='display-flex flex-justify'>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default CustomHeader;
