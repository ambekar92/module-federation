import { CharacterCount, Checkbox, FileInput, Label, Select, TextInput, TextInputMask } from '@trussworks/react-uswds';
import { QuestionType, SelectQuestion } from '../utils/types';

interface MainContentProps {
	sectionName?: string;
	children?: React.JSX.Element;
  currentSection?: { sectionName: string; questions: QuestionType[] };
}

const QuestionContent = ({ currentSection, sectionName, children }: MainContentProps) => {
  let content = <></>
  if(currentSection) {
    content = (
      <>
        <h2>{currentSection.sectionName}</h2>
        {currentSection.questions.map((question, index) => {
          const inputId = `input-${question.input.type}-${index}`;
          switch (question.input.type) {
            case 'text':
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <TextInput type='text' id={inputId} name={question.input.name} />
                </div>
              );
            case 'email':
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <TextInput type='email' id={inputId} name={question.input.name} />
                </div>
              );
            case 'number':
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <TextInput type='number' id={inputId} name={question.input.name} />
                </div>
              );
            case 'textarea':
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <span id={`${inputId}-hint`} className="usa-hint">
									This is a textarea with a character counter.
                  </span>
                  <CharacterCount id={inputId} name={question.input.name} maxLength={1000} isTextArea rows={2} aria-describedby={`${inputId}-info ${inputId}-hint`} />
                </div>
              );
            case 'select':
            // eslint-disable-next-line no-case-declarations
              const selectQuestion = question as SelectQuestion;
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <Select id={inputId} name={selectQuestion.input.name}>
                    <option>- Select -</option>
                    {selectQuestion.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </Select>
                </div>
              );
            case 'phone':
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <span className="usa-hint">
									Provide a primary contact number
                  </span>
                  <TextInputMask id={inputId} name={question.input.name} type="tel" mask="___-___-____" pattern="\d{3}-\d{3}-\d{4}" />
                </div>
              );
            case 'file':
              return (
                <div key={inputId}>
                  <Label htmlFor={inputId}><span className='text-bold'>{question.label}</span></Label>
                  <span className="usa-hint" id={`${inputId}-hint`}>
									Only .pdf and .txt file formats are accepted
                  </span>
                  <FileInput id={inputId} name={question.input.name} accept=".pdf,.txt" aria-describedby={`${inputId}-hint`} multiple />
                </div>
              );
            case 'checkbox':
              return (
                <div key={inputId}>
                  {question.details && (<p className='margin-bottom-5'>{question.details}</p>)}
                  <Checkbox id={inputId} name={question.input.name} label={question.label} />
                </div>
              );
            default:
              return <div key={inputId}>Unsupported input type</div>;
          }
        })}
      </>
    )
  } else {
    content = (
      <>
        <h2>{sectionName}</h2>
        {children}
      </>
    )
  }
  return content;
};

export default QuestionContent;
