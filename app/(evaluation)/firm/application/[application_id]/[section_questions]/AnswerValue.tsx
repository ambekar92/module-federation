import React from 'react';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Label } from '@trussworks/react-uswds';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type GridRow = {
  [key: string]: string | string[];
};

type GridAnswer = {
  answer: GridRow[];
};

const isGridAnswer = (value: any): value is GridAnswer => {
  return Array.isArray(value.answer) && value.answer.every((row: any) => typeof row === 'object' && row !== null);
};

const AnswerValue = ({ question }: { question: Question }) => {
  const renderGridAnswer = (q: Question): JSX.Element | null => {
    if (!q.answer?.value || !isGridAnswer(q.answer.value)) {
      return null;
    }
    const gridRows = q.answer.value.answer;
    if (gridRows.length === 0 || !q.grid_questions) {
      return null;
    }

    const columns = q.grid_questions.map(gq => ({
      id: gq.name,
      title: gq.title
    }));

    return (
      <>
        <div>
          <Label className='margin-bottom-05' style={{ maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={q.name}>
            {q?.title}
          </Label>

          {q.description && <p className='margin-top-05'>{q.description}</p>}
        </div>

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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ fontWeight: 'bold' }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gridRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {Array.isArray(row[column.id])
                        ? (row[column.id] as string[]).join(', ')
                        : row[column.id] as string}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const renderAnswerValue = (q: Question): string | JSX.Element | null => {
    if (q.question_type === 'api.get.questionnaire') {
      return null;
    }

    if (!q.answer?.value && q.question_type === 'grid') {
      return null;
    }

    if (!q.answer?.value) {
      return 'No answer provided';
    }

    if (q.question_type === 'grid') {
      return renderGridAnswer(q);
    }

    let answerValue = q.answer.value.answer;
    if (Array.isArray(answerValue)) {
      return answerValue.join(', ');
    }
    // Convert TRUE/FALSE to Yes/No
    if (answerValue === 'TRUE') {
      answerValue = 'Yes';
    } else if (answerValue === 'FALSE') {
      answerValue = 'No';
    }

    return String(answerValue);
  };

  const renderSubQuestions = (q: Question): JSX.Element | null => {
    if (!q.rules) {return null;}
    const subQuestions = q.rules
      .filter(rule => rule.sub_question)
      .map(rule => rule.sub_question as Question);
    if (subQuestions.length === 0) {return null;}
    return (
      <div style={{ marginLeft: '20px' }}>
        {subQuestions.map((subQ, index) => {
          // Skip sub-questions that are not answered
          // Skip sub-questions that are of type 'api.get.questionnaire'
          if (subQ.question_type === 'api.get.questionnaire' || subQ.answer?.value === null) {
            return null;
          }
          return (
            <div key={index}>
              <Label style={{maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={subQ.name}>
                {subQ.title}
              </Label>
              {/* <span className='text-base'>
                {subQ.description?.toLowerCase() !== subQ.title?.toLowerCase() ? subQ.description : ''}
              </span> */}
              <p>{subQ?.question_type !== 'grid' && (<b>Answer:</b>)} {renderAnswerValue(subQ)}</p>
              {renderSubQuestions(subQ)}
            </div>
          );
        })}
      </div>
    );
  };

  if (question.question_type === 'api.get.questionnaire') {
    return null;
  }

  if (question.grid_questions && question.grid_questions.length > 0) {
    return renderGridAnswer(question);
  }

  return (
    <div className="margin-bottom-205 border-bottom">
      <Label style={{maxWidth: 'fit-content', fontWeight: 'bold'}} htmlFor={question.name}>
        {question.title}
      </Label>
      {/* <p>{question.description}</p> */}
      <div className="margin-top-2 margin-bottom-2">
        <b>Answer:</b> {renderAnswerValue(question)}
      </div>
      {renderSubQuestions(question)}
    </div>
  );
};

export default AnswerValue;
