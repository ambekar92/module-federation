import { Card, Collection, CollectionItem } from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react';
import { getReports } from '../mockData';

const Reporting = () => {
    const [list, setList] = useState<any[]>([]);
    console.log('reporting')
    useEffect(() => {
        setList(getReports())
    }, [])
  return (
    <>
    <h3>Reporting</h3>
    <Card>
        <Collection color='base-lightest'style={{paddingTop: 0}} >
            {list.map((l, idx) => <CollectionItem  key={l.id} 
            style={{border: 'none', marginTop: idx === 0 ? '0' : 'normal', paddingTop:  idx === 0 ? '0' : 'normal', textDecoration: 'underline' }}>
                {l.name}
            </CollectionItem>)}
        </Collection>
    </Card>
    </>
  )
}

export default Reporting