import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Question } from '../../types/questionnaireTypes';

interface GridQuestion {
  id: string;
  name: string;
  title: string;
  question_type: string;
}

interface UCPTableProps {
  gridQuestions: GridQuestion[] | Question[];
  gridRows: any[];
  handleEditRow?: (index: number) => void;
  handleDeleteRow?: (index: number) => void;
}

/**
 * A table component that displays a list of questions and their corresponding answers.
 *
 * @param {UCPTableProps} props - The props for the component.
 * @param {GridQuestion[]} props.gridQuestions - The questions to display.
 * @param {any[]} props.gridRows - The answers to display.
 * @param {(index: number) => void} [props.handleEditRow] - The function to call when a row is edited.
 * @param {(index: number) => void} [props.handleDeleteRow] - The function to call when a row is deleted.
 * @returns {React.ReactElement} The table component.
 */
export const UCPTable: React.FC<UCPTableProps> = ({
  gridQuestions,
  gridRows,
  handleEditRow,
  handleDeleteRow,
}) => {
  if (gridRows.length === 0) {return null;}

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: '1px solid #adadad',
        borderRadius: '4px',
        maxWidth: '100%',
        width: 'fit-content',
        overflowX: 'auto',
        marginTop: '20px',
        padding: '0 16px',
      }}
    >
      <Table aria-label="sticky table">
        <TableHead>
          <TableRow>
            {gridQuestions.map((gridQuestion) => (
              gridQuestion.question_type !== 'document_upload' && (
                <TableCell
                  key={gridQuestion.id}
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    padding: '16px 8px',
                  }}
                >
                  {gridQuestion.title}
                </TableCell>
              )
            ))}
            <TableCell
              sx={{
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                padding: '16px 8px',
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Todo: Need to remove *** checker after BE fix */}
          {!gridRows.includes('******') && gridRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {gridQuestions.map((gridQuestion) => (
                gridQuestion.question_type !== 'document_upload' && (
                  <TableCell
                    key={gridQuestion.id}
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      padding: '16px 8px',
                    }}
                  >
                    {Array.isArray(row[gridQuestion.name])
                      ? (row[gridQuestion.name] as string[]).join(', ')
                      : row[gridQuestion.name] as string}
                  </TableCell>
                )
              ))}
              {(handleDeleteRow || handleEditRow) && (
                <TableCell sx={{ padding: '16px 8px', whiteSpace: 'nowrap' }}>
                  {handleEditRow && (
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditRow(rowIndex)}
                      disableRipple
                      sx={{ padding: '0', marginRight: '8px' }}
                    >
                      <EditIcon />
                      <span className='text-size-xs margin-left-1'>Edit</span>
                    </IconButton>
                  )}

                  {handleDeleteRow && (
                    <IconButton
                      aria-label="delete"
                      disableRipple
                      onClick={() => handleDeleteRow(rowIndex)}
                      sx={{ padding: '0' }}
                    >
                      <DeleteIcon />
                      <span className='text-size-xs margin-left-1'>Delete</span>
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
