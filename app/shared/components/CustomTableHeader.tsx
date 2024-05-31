import React, { FC } from 'react';

export interface CustomTableHeaderProps {
  header: any[];
  editable?: boolean;
  remove?: boolean;
}

export const TableHeader: FC<CustomTableHeaderProps> = ({ header, editable, remove }) => {
  return (
    <thead>
      <tr>
        {header.map((column: any) => (
          <th key={column.id} scope="col">
            {column.headerName}
          </th>
        ))}
        {(editable || remove) && (
          <th colSpan={editable && remove ? 2 : 1}></th>
        )}
      </tr>
    </thead>
  );
};
