
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Label, Table, TextInput } from '@trussworks/react-uswds';
import { useState } from 'react';

type GridRow = {
  [key: string]: string;
};

export const GridQuestion = ({ question }: { question: Question }) => {
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentRow, setCurrentRow] = useState<GridRow>({});

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const handleAddOrUpdateRow = () => {
    if (editingIndex !== null) {
      setGridRows(prevRows => {
        const updatedRows = [...prevRows];
        updatedRows[editingIndex] = currentRow;
        return updatedRows;
      });
      setEditingIndex(null);
    } else {
      setGridRows(prevRows => [...prevRows, currentRow]);
    }
    setCurrentRow({});
  };

  const handleEditRow = (index: number) => {
    setCurrentRow(gridRows[index]);
    setEditingIndex(index);
  };

  const handleInputChange = (questionName: string, value: string) => {
    setCurrentRow(prevRow => ({ ...prevRow, [questionName]: value }));
  };

  return (
    <>
      <div>
        {question.grid_questions?.map(gridQuestion => (
          <div key={gridQuestion.id}>
            <Label className='maxw-full text-bold' requiredMarker={gridQuestion.answer_required_flag} htmlFor={`input-${gridQuestion.id}`}>
              <span className='text-bold'>{gridQuestion.title}</span>
            </Label>
            <TextInput
              type='text'
              id={`input-${gridQuestion.id}`}
              name={gridQuestion.title}
              value={currentRow[gridQuestion.title] || ''}
              onChange={(e) => handleInputChange(gridQuestion.title, e.target.value)}
            />
          </div>
        ))}
      </div>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddOrUpdateRow}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </Button>
        <Button type='button' unstyled className='padding-x-2' onClick={() => setCurrentRow({})}>Cancel</Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <Table bordered className='width-full'>
          <thead>
            <tr>
              {question.grid_questions?.map(gridQuestion => (
                <th key={gridQuestion.id} scope="col">{gridQuestion.title}</th>
              ))}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, index) => (
              <tr key={index}>
                {question.grid_questions?.map(gridQuestion => (
                  <td key={gridQuestion.id}>{row[gridQuestion.title]}</td>
                ))}
                <td>
                  <Button type="button" onClick={() => handleEditRow(index)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
