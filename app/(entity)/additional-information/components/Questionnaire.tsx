import { QaQuestionsType, qaFetcherGET } from '@/app/services/qa-fetcher';
import { FileInput, Label, Select, TextInput } from '@trussworks/react-uswds';
import useSWR from 'swr';

interface QuestionnaireProps {
  url: string;
  title: string;
}

const Questionnaire = ({ url, title }: QuestionnaireProps) => {
  const { data, error } = useSWR<QaQuestionsType>(url, qaFetcherGET);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const sortedAndFilteredQuestions = Object.values(data.questions)
    .filter(question => question.question__question_ordinal !== null)
    .sort((q1, q2) => (q1.question__question_ordinal! - q2.question__question_ordinal!));

  return (
    <>
      <h2>{title}</h2>
      {sortedAndFilteredQuestions.map((question, index) => {
        const inputId = `input-${question.question__question_type__name}-${index}`;
        switch (question.question__question_type__name) {
          case 'text':
            return (
              <div key={inputId}>
                <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                <TextInput type='text' id={inputId} name={question.question__name} />
              </div>
            );
          case 'number':
            return (
              <div key={inputId}>
                <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                <TextInput type='number' id={inputId} name={question.question__name} />
              </div>
            );
          case 'boolean':
            return (
              <div key={inputId}>
                <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                <div className='usa-radio display-flex gap-1'>
                  <input
                    className="usa-radio__input"
                    id={`${inputId}-true`}
                    type="radio"
                    value="true"
                    name={question.question__name}
                  />
                  <Label className="usa-radio__label" htmlFor={`${inputId}-true`}>
                    Yes
                  </Label>
                  <input
                    className="usa-radio__input"
                    id={`${inputId}-false`}
                    type="radio"
                    value="false"
                    name={question.question__name}
                  />
                  <Label className="usa-radio__label margin-left-105" htmlFor={`${inputId}-false`}>
                    No
                  </Label>
                </div>
              </div>
            );
          case 'document_upload':
            return (
              <div key={inputId}>
                <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                <span className="usa-hint" id={`${inputId}-hint`}>
										Only .pdf and .txt file formats are accepted
                </span>
                <FileInput id={inputId} name={question.question__name} accept=".pdf,.txt" aria-describedby={`${inputId}-hint`} multiple />
              </div>
            );
          case 'grid':
            return (
              <div key={inputId}>
                {/* {question.question__answer_choice?.grid_question_names.map((gridQuestionName, idx) => {
                  const gridQuestion = data.questions[gridQuestionName];
                  if (gridQuestion) {
                    const gridInputId = `input-${gridQuestion.question__question_type__name}-${idx}`;
                    switch (gridQuestion.question__question_type__name) {
                      case 'text':
                        return (
                          <div key={gridInputId}>
                            <Label htmlFor={gridInputId}><span className='text-bold'>{gridQuestion.question__title}</span></Label>
                            <TextInput type='text' id={gridInputId} name={gridQuestion.question__name} />
                          </div>
                        );
                      case 'boolean':
                        return (
                          <div key={gridInputId}>
                            <Label htmlFor={gridInputId}><span className='text-bold'>{gridQuestion.question__title}</span></Label>
                            <div className='usa-radio'>
                              <input
                                className="usa-radio__input"
                                id={`${gridInputId}-true`}
                                type="radio"
                                value="true"
                                name={gridQuestion.question__name}
                              />
                              <Label className="usa-radio__label" htmlFor={`${gridInputId}-true`}>
                                Yes
                              </Label>
                              <input
                                className="usa-radio__input"
                                id={`${gridInputId}-false`}
                                type="radio"
                                value="false"
                                name={gridQuestion.question__name}
                              />
                              <Label className="usa-radio__label" htmlFor={`${gridInputId}-false`}>
                                No
                              </Label>
                            </div>
                          </div>
                        );
                      default:
                        return <div key={gridInputId}>Unsupported input type</div>;
                    }
                  }
                  return <div key={`${inputId}-data-${idx}`}>No matching question found</div>;
                })}
                <button type="button" className='usa-button margin-top-1' onClick={() => {}}>Add</button> */}
              </div>
            );
          case 'select':
            if (question.question__answer_choice && 'options' in question.question__answer_choice) {
              return (
                <div key={inputId}>
                  <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                  <Select id={inputId} name={question.question__name}>
                    <option>- Select -</option>
                    {question.question__answer_choice.options.map((option, idx) => (
                      <option key={idx} value={option.option}>
                        {option.option}
                      </option>
                    ))}
                  </Select>
                </div>
              );
            }
            return null;
          case 'multi_select':
            if (question.question__answer_choice && 'options' in question.question__answer_choice) {
              return (
                <div key={inputId}>
                  <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                  <Select id={inputId} name={question.question__name} multiple>
                    <option>- Select -</option>
                    {question.question__answer_choice.options.map((option, idx) => (
                      <option key={idx} value={option.option}>
                        {option.option}
                      </option>
                    ))}
                  </Select>
                </div>
              );
            }
            return null;
          case 'api.get_program_eligibility_list.multi_select':
            if (question.question__answer_choice && 'options' in question.question__answer_choice) {
              return (
                <div key={inputId}>
                  <Label requiredMarker={question.question__answer_required_flag} htmlFor={inputId}><span className='text-bold'>{question.question__title}</span></Label>
                  <Select id={inputId} name={question.question__name} multiple>
                    <option>- Select -</option>
                    {question.question__answer_choice.options.map((option, idx) => (
                      <option key={idx} value={option.option}>
                        {option.option}
                      </option>
                    ))}
                  </Select>
                </div>
              );
            }
            return null;
          default:
            return <div key={inputId}>Unsupported input type ({question.question__question_type__name})</div>;
        }
      })}
    </>
  );
};

export default Questionnaire;
