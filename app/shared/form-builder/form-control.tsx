'use client'
import { MainQuestionObject } from '@/app/shared/form-builder/questionnaire-types/question'
import { QuestionType } from '@/app/shared/form-builder/questionnaire-types/question-types'
import Date from '@/app/shared/form-builder/form-controls/Date'
import Dropdown from '@/app/shared/form-builder/form-controls/Dropdown'
import Input from '@/app/shared/form-builder/form-controls/Input'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import DocumentUpload from '@/app/shared/form-builder/form-controls/document-upload/DocumentUpload'
import { useFormContext } from 'react-hook-form'

const FormControl = ({question}: {question: MainQuestionObject}) => {
  const {getValues, watch} = useFormContext();

  return (
    <>
      {question.question_type === 'boolean' && <ToggleButtonGroup<MainQuestionObject, string>
        label={question.title}
        name={question.name as any}
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        options={[{label: 'Yes', value: 'TRUE'}, {label: 'No', value: 'FALSE'}]}/>}

      {question.question_type === QuestionType.TEXT && <Input<MainQuestionObject>
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        label={question.title} />}

      {question.question_type === QuestionType.TEXT_AREA && <TextArea<MainQuestionObject>
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        label={question.title} />}

      {question.question_type === QuestionType.DATE && <Date<MainQuestionObject>
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        label={question.title} />}

      {question.question_type === QuestionType.READ_ONLY && <Input<MainQuestionObject>
        disabled={true}
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        label={question.title} />}

      {question.question_type === QuestionType.DOCUMENT_UPLOAD && <DocumentUpload<MainQuestionObject>
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        label={question.title} />}

      {question.question_type === QuestionType.MULTI_SELECT && <Dropdown<MainQuestionObject>
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        multiple={true}
        label={question.title}>
        {question.answer_choice?.options?.map(option => (
          <option key={option.option} value={option.option}>{option.option}</option>
        ))}
      </Dropdown>}

      {question.question_type === QuestionType.SELECT && <Dropdown<MainQuestionObject>
        hint={question.description?.toLowerCase() !== question.title?.toLowerCase() ? question.description : ''}
        name={question.name as any}
        multiple={false}
        label={question.title}>
        {question.answer_choice?.options?.map(option => (
          <option key={option.option} value={option.option}>{option.option}</option>
        ))}
      </Dropdown>}
    </>
  )
}

export default FormControl
