import React from 'react'
import HttpError from '../utils/HtmlError'

const MockSuccessComponent = () => <div>Component loaded successfully</div>

interface Props {
   statusCode: number
}

const MockErrorComponent = ({ statusCode }: Props) => {
   throw new HttpError('Error occurred', statusCode)
}

export { MockSuccessComponent, MockErrorComponent }
