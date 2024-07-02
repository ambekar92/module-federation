import { Button, ButtonGroup, Grid, Label, TextInput } from '@trussworks/react-uswds';
import { useState } from 'react';
import { CustomTable } from '@/app/shared/components/CustomTable'; // Correct import with brackets
import { Question } from '../../types/questionnaireTypes';

type GridRow = {
  [key: string]: string;
};

const GridQuestion = ({ question }: { question: Question }) => {
  const [gridRows, setGridRows] = useState<GridRow[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentRow, setCurrentRow] = useState<GridRow>({});

  const handleAddOrUpdateRow = () => {
    const isRowEmpty = question.grid_questions?.some(gridQuestion => !currentRow[gridQuestion.title]);
    if (isRowEmpty) {
      alert('Please fill out all required fields.');
      return;
    }

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

  const handleDeleteRow = (index: number) => {
    setGridRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  const handleInputChange = (questionName: string, value: string) => {
    setCurrentRow(prevRow => ({ ...prevRow, [questionName]: value }));
  };

  const tableHeaders = question.grid_questions?.map(gridQuestion => ({
    id: gridQuestion.id.toString(),
    headerName: gridQuestion.title,
  })) || [];

  const tableRows = gridRows.map((row, index) => {
    const rowContent: { [key: string]: string } = { id: index.toString() };
    question.grid_questions?.forEach(gridQuestion => {
      rowContent[gridQuestion.id.toString()] = row[gridQuestion.title];
    });
    return rowContent;
  });

  return (
    <>
      <Label htmlFor='' className='maxw-full' requiredMarker={question.answer_required_flag}>{question.title}</Label>
      <Grid row gap='md'>
        {question.grid_questions?.map(gridQuestion => (
          <Grid col={6} key={gridQuestion.id}>
            <Label className='maxw-full margin-top-1' requiredMarker={gridQuestion.answer_required_flag} htmlFor={`input-${gridQuestion.id}`}>
              <span>{gridQuestion.title}</span>
            </Label>
            <TextInput
              type='text'
              id={`input-${gridQuestion.id}`}
              name={gridQuestion.title}
              value={currentRow[gridQuestion.title] || ''}
              onChange={(e) => handleInputChange(gridQuestion.title, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>
      <ButtonGroup className='margin-top-2'>
        <Button type='button' onClick={handleAddOrUpdateRow}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </Button>
        <Button type='button' unstyled className='padding-x-2' onClick={() => setCurrentRow({})}>Cancel</Button>
      </ButtonGroup>

      {gridRows.length > 0 && (
        <CustomTable
          header={tableHeaders}
          rows={tableRows}
          editable={true}
          remove={true}
          onEdit={handleEditRow}
          onDelete={handleDeleteRow}
        />
      )}
    </>
  );
};

export default GridQuestion;
