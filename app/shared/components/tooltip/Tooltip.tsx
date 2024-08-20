import React from 'react';
import { Tooltip } from '@trussworks/react-uswds';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

interface TooltipIconProps {
  text: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ text }) => {
  return (
    <Tooltip className='padding-0' style={{background: 'none'}} label={text}>
      <TipsAndUpdatesIcon className='margin-left-1 text-primary'/>
    </Tooltip>
  );
};

export default TooltipIcon;
