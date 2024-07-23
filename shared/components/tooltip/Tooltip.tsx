import React from 'react';
import { Tooltip } from '@trussworks/react-uswds';
import Image from 'next/image';

interface TooltipIconProps {
  text: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ text }) => {
  return (
    <Tooltip className='padding-0' style={{background: 'none'}} label={text}>
      <Image
        src="./icons/tooltip-info.svg"
        width={20}
        height={20}
        alt="Tooltip Icon"
        className="margin-left-1 text-secondary-dark"
      />
    </Tooltip>
  );
};

export default TooltipIcon;
