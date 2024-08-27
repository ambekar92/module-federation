'use client';
import LeftPanel from '@/app/(evaluation)/components/left-panel/LeftPanel';
import { PropsWithChildren } from 'react';

const layout = ({children}: PropsWithChildren) => {
  return (
    <div className="grid-row">
      <div className="grid-col-3 bg-white">
        <LeftPanel  />
      </div>
      <div className={'grid-col-9 padding-2'}>
        {children}
      </div>
    </div>
  )
}

export default layout
