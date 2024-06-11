'use client'
import React, { FC } from 'react';

export interface CustomTableHeaderProps {
  headers: { id: number; headerName: string }[]
  editable?: boolean
  remove?: boolean
}
export const TableHeader: FC<CustomTableHeaderProps> = ({
  headers,
  editable,
  remove,
}) => {
  return (
    <thead>
      <tr>
        {headers
          .filter(
            (column: any) =>
              !(column.headerName === 'Edit' && !column.editable) &&
              !(column.headerName === 'Delete' && !column.remove),
          )
          .map((column: any) => (
            <th key={column.id} scope="col">
              {column.headerName}
            </th>
          ))}

        {editable &&  <th></th>}
        {remove &&  <th></th>}

      </tr>
    </thead>
  );
};
