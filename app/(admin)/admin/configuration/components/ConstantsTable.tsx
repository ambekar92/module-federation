'use client'
import { useConstants } from '@/app/services/queries/public-service/useConstants'
import { Search, Table } from '@trussworks/react-uswds'
import React, { useState } from 'react';

const ConstantsTable = () => {
    const {data, isLoading} = useConstants();
    const [searchValue, setSearchValue] = useState('');

    function search(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchVal = (e.target as any)?.['0']?.value;
        setSearchValue(searchVal);
    }
    
  return (
    <div>
        {isLoading && <h1>Loading...</h1>}
        
        {!!data && !isLoading && <><h1>System Configuration</h1>
        <Search onSubmit={e => {e.preventDefault(); search(e)}} inputName='search' />
        <Table fullWidth>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {data?.filter(el => el.key.toLowerCase().indexOf(searchValue.toLowerCase())!==-1)?.map((item) => (
                    <tr key={item.id}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table></>}
        
    </div>
  )
}

export default ConstantsTable