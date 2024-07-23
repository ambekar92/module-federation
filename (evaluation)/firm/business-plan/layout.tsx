'use client';
import { PropsWithChildren } from 'react';
import BusinessPlanLeftPanel from './components/BusinessPlanLeftPanel';

const layout = ({children}: PropsWithChildren) => {
  return (
    <div className="grid-row flex-1 height-full">
      <div className="grid-col-3 bg-gray-5 padding-top-2">
        <BusinessPlanLeftPanel />
      </div>
      <div className={'grid-col-9 padding-2'}>
        {children}
      </div>
    </div>
  )
}

export default layout
