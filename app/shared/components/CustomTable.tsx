import React, { FC } from 'react';
import { Icon, Table } from '@trussworks/react-uswds';
import { TableHeader } from './CustomTableHeader';

export interface CustomTableProps {
  rows: any[];
  header: any[];
  editable?: boolean;
  remove?: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const CustomTable: FC<CustomTableProps> = ({
  rows,
  editable,
  remove,
  header,
  onDelete,
  onEdit
}) => {
  return (
    <Table bordered fullWidth={true}>
      <TableHeader header={header} editable={editable} remove={remove} />
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id}>
            {header.map((col) => (
              <td key={col.id}>{row[col.id]}</td>
            ))}
            {editable && (
              <td onClick={() => onEdit(index)} className='cursor-pointer'>
                <div className='display-flex flex-align-center'>
                  <Icon.Edit className='margin-right-1' /><span className='mobile:display-none'>Edit</span>
                </div>
              </td>
            )}
            {remove && (
              <td onClick={() => onDelete(index)} className='cursor-pointer'>
                <div className='display-flex flex-align-center'>
                  <Icon.Delete className='margin-right-1' /><span className='mobile:display-none'>Delete</span>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
