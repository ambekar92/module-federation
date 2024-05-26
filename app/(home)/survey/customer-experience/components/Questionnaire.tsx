import { useState } from 'react'
import { Label, TextInput, Textarea, Table } from '@trussworks/react-uswds'
import { data } from './form-data'
import { filterText } from '../utils/helpers'

interface QuestionnaireProps {
  currentPage: number
  decrementLastPage: () => void
  incrementLastPage: () => void
  proceedWithSurvey: () => void
}

const Questionnaire = ({
  currentPage,
  decrementLastPage,
  incrementLastPage,
  proceedWithSurvey,
}: QuestionnaireProps) => {
  const [allowDemographic, setAllowDemographic] = useState(true)

  const changeDemograhicInfoAccess = (value: boolean) => {
    if (value !== allowDemographic) {
      allowDemographic ? decrementLastPage() : incrementLastPage()
      setAllowDemographic(value)
    }
  }

  function displayContent(pageDisplayed: number) {
    if (
      (pageDisplayed === currentPage && currentPage !== 7) ||
      (pageDisplayed === currentPage && currentPage === 7 && allowDemographic)
    ) {
      return true
    }
    return false
  }

  return (
    <>
      {data.map((question, index) => {
        const inputId = `input-${question.question__question_type__name}-${index}`
        switch (question.question__question_type__name) {
          case 'text':
            return (
              <div
                className={
                  displayContent(question.pageDisplayed)
                    ? 'padding-bottom-2'
                    : 'display-none padding-bottom-2'
                }
                key={inputId}
              >
                <h2 className="padding-bottom-2">{question.question__title}</h2>
                <TextInput
                  type="text"
                  id={inputId}
                  name={question.question__name}
                  className="margin-left-3"
                  maxLength={5}
                  onChange={(e) => {
                    if (question.question__name === 'zip') {
                      e.target.value = filterText(e.target.value, true)
                    }
                  }}
                />
              </div>
            )
          case 'textarea':
            return (
              <div
                className={
                  displayContent(question.pageDisplayed)
                    ? 'padding-bottom-1'
                    : 'display-none padding-bottom-1'
                }
                key={inputId}
              >
                <h2 className="padding-bottom-1">{question.question__title}</h2>
                <Textarea
                  id={inputId}
                  name={question.question__name}
                  className="margin-left-3 maxw-full width-full"
                  maxLength={500}
                />
              </div>
            )
          case 'number':
            return (
              <div
                className={
                  displayContent(question.pageDisplayed)
                    ? 'padding-bottom-1'
                    : 'display-none padding-bottom-1'
                }
                key={inputId}
              >
                <h2 className="padding-bottom-1">{question.question__title}</h2>
                <TextInput
                  type="number"
                  id={inputId}
                  name={question.question__name}
                  className="margin-left-3"
                />
              </div>
            )
          case 'radio':
          case 'checkbox':
            if (
              question.question__answer_choice &&
              'options' in question.question__answer_choice
            ) {
              return (
                <div
                  className={
                    displayContent(question.pageDisplayed)
                      ? 'padding-bottom-1'
                      : 'display-none padding-bottom-1'
                  }
                  key={inputId}
                >
                  <h2 className="padding-bottom-1">
                    {question.question__title}
                  </h2>
                  <div className="usa-radio margin-left-3">
                    {question.question__answer_choice.options.map(
                      (option, idx) => (
                        <>
                          <input
                            className={
                              question.question__question_type__name === 'radio'
                                ? 'usa-radio__input'
                                : 'usa-checkbox__input'
                            }
                            id={`${inputId}-${option.label}`}
                            type={
                              question.question__question_type__name === 'radio'
                                ? 'radio'
                                : 'checkbox'
                            }
                            value={option.value}
                            name={question.question__name}
                            onChange={(e) => {
                              if (
                                question.question__name === 'demographicInfo'
                              ) {
                                changeDemograhicInfoAccess(
                                  e.target.value === 'Yes',
                                )
                              }
                            }}
                          />
                          <Label
                            className={
                              question.question__question_type__name === 'radio'
                                ? 'usa-radio__label'
                                : 'usa-checkbox__label'
                            }
                            htmlFor={`${inputId}-${option.label}`}
                          >
                            {option.label}
                          </Label>
                          {option.label === 'Other (please specify)' ||
                          option.label ===
                            'Prefer to self describe (please specify)' ? (
                              <TextInput
                                type="text"
                                id={`${inputId}-${option.label}-text`}
                                name={`${question.question__name}-text`}
                                className="margin-left-3"
                              />
                            ) : null}
                        </>
                      ),
                    )}
                  </div>
                </div>
              )
            }
            return null
          case 'radio-horizontal':
            if (
              question.question__answer_choice &&
              'options' in question.question__answer_choice
            ) {
              return (
                <div
                  className={
                    displayContent(question.pageDisplayed)
                      ? 'padding-bottom-1'
                      : 'display-none padding-bottom-1'
                  }
                  key={inputId}
                >
                  <h2 className="padding-bottom-1">
                    {question.question__title}
                  </h2>
                  <div className="usa-radio margin-left-3">
                    <Table striped fullWidth>
                      <thead>
                        <tr>
                          {question.question__answer_choice.options.map(
                            (option) => (
                              <th
                                key={`${inputId}-th-${option.label}`}
                                style={{
                                  width:
                                    (
                                      100 /
                                      question.question__answer_choice.options
                                        .length
                                    ).toString() + '%',
                                }}
                              >
                                <span className="display-flex flex-column flex-align-center text-light">
                                  {' '}
                                  {option.label}{' '}
                                </span>
                              </th>
                            ),
                          )}
                          <th
                            className="display-none"
                            style={{
                              width: '0%',
                            }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {question.question__answer_choice.options.map(
                            (option, idx) => (
                              <td key={`${inputId}-td-${option.label}`}>
                                <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                                  <input
                                    className="usa-radio__input"
                                    id={`${inputId}--${option.label}`}
                                    type="radio"
                                    value={option.value}
                                    name={question.question__name}
                                    onChange={(e) => {
                                      question.question__name ===
                                        'overallExperience' &&
                                        proceedWithSurvey()
                                    }}
                                  />
                                  <Label
                                    className="usa-radio__label"
                                    htmlFor={`${inputId}--${option.label}`}
                                  >
                                    {null}
                                  </Label>
                                </div>
                              </td>
                            ),
                          )}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              )
            }
            return null
          case 'table':
            if (
              question.question__answer_choice &&
              'table' in question.question__answer_choice
            ) {
              return (
                <div
                  className={
                    displayContent(question.pageDisplayed)
                      ? 'padding-bottom-1'
                      : 'display-none padding-bottom-1'
                  }
                  key={inputId}
                >
                  <h2 className="padding-bottom-1">
                    {question.question__title}
                  </h2>
                  <div className="margin-left-3">
                    <Table striped>
                      <thead>
                        <tr>
                          <th
                            style={{
                              width:
                                (
                                  100 /
                                  (question.question__answer_choice.table.header
                                    .length +
                                    1)
                                ).toString() + '%',
                            }}
                          ></th>
                          {question.question__answer_choice.table.header.map(
                            (col) => (
                              <th
                                key={`${inputId}-th-${col}`}
                                style={{
                                  width:
                                    (
                                      100 /
                                      (question.question__answer_choice.table
                                        .header.length +
                                        1)
                                    ).toString() + '%',
                                }}
                              >
                                <span className="display-flex flex-column flex-align-center text-light">
                                  {' '}
                                  {col}{' '}
                                </span>
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {question.question__answer_choice.table.body.map(
                          (row: any) => (
                            <tr key={`${inputId}-tr-${row.question__name}`}>
                              <td>{row.question}</td>
                              {question.question__answer_choice.table.header.map(
                                (col) => (
                                  <td
                                    key={`${inputId}-${row.question__name}-${col}`}
                                  >
                                    <div className="usa-radio display-flex flex-column flex-align-center display-flex flex-row flex-align-center bg-transparent padding-bottom-4">
                                      <input
                                        className="usa-radio__input"
                                        id={`${inputId}-${row.question__name}-${col}`}
                                        type="radio"
                                        value={col}
                                        name={row.question__name}
                                      />
                                      <Label
                                        className="usa-radio__label"
                                        htmlFor={`${inputId}-${row.question__name}-${col}`}
                                      >
                                        {null}
                                      </Label>
                                    </div>
                                  </td>
                                ),
                              )}
                            </tr>
                          ),
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )
            }
            return null
          default:
            return null
        }
      })}
    </>
  )
}

export default Questionnaire
