'use client'
import React, { FC } from 'react'

export interface CustomTableHeaderProps {
  headers: { id: number; headerName: string }[]
  editable?: boolean
  remove?: boolean
}
export const TableHeader: FC<CustomTableHeaderProps> = ({
  headers,
}) => {
  return (
    <thead>
      <tr>
        {headers.map((item: any) => (
          <th
            key={item.id}
            style={{
              paddingLeft: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            {item.headerName}
          </th>
        ))}
      </tr>
    </thead>
  )
}
