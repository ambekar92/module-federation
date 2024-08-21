'use client'
import React, { useState } from 'react'
import { SideNav, Link, Grid } from '@trussworks/react-uswds'
import { notifications } from './utils/types'
import styles from './controlling.module.scss'

const RedCircle: React.FC = () => {
    return (
      <div style={{
        width: '7px',  
        height: '7px',
        borderRadius: '50%',
        backgroundColor: '#E41D3D'
      }} />
    );
  };

const ControllEntitySideBar: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0); 
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => { 
    const scrollTop = event.currentTarget.scrollTop; 
    const newStartIndex = Math.floor(scrollTop / (event.currentTarget.clientHeight)); 
    setStartIndex(newStartIndex); 
    }; 
  const listItemClasses =
    'bg-white radius-sm width-full margin-y-1 height-10 line-height' +
    styles.lineHeight
  return (
    <div>
      <div className="padding-left-2 padding-right-2"  style={{
        height: '800px', 
        overflowY: 'scroll'
      }} onScroll={handleScroll}>
        <SideNav
          items={[
            <>
              {notifications.map((item: any, index) => (
                <li key={index} className={listItemClasses}>
                  <Link
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                    href="/should-i-apply/match"
                  >
                    <div className="display-flex flex-column flex-align-start">
                      <span style={{ fontWeight: 'bold' }}>
                        {item.eventName}
                      </span>
                      <Grid row >
                        <Grid className="">
                          <span className="padding-right-10 margin-right-10">{item.firmName}</span>
                        </Grid>
                        <Grid className="padding-top-1">
                          <span ><RedCircle/></span>
                        </Grid>
                      </Grid>
                      <span>{item.date}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          ]}
        />
      </div>
    </div>
  )
}
export default ControllEntitySideBar
