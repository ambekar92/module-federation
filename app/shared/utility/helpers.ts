export const capitalizeAndSplit = (text: string) => {
  if (text === 'service_disabled_veteran') {
    return 'Service-Disabled Veteran'
  }
  return text.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '').slice(0, 10) // Restrict to 10 digits
  const length = cleaned.length

  if (length < 4) {
    return cleaned
  } else if (length < 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
}

export const formatSSN = (ssn: string) => {
  if (!ssn) {return ssn}
  const cleaned = ssn.replace(/\D/g, '') // Remove all non-digits
  const length = cleaned.length

  if (length < 4) {
    return cleaned
  } else if (length < 6) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else if (length <= 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`
  }
}

export const filterText = (
  text: string,
  onlyNumbers: boolean = false,
): string => {
  if (onlyNumbers) {
    // Filter out everything but digits
    return text.replace(/\D/g, '')
  }
  // Filter out non-alphanumeric characters (as per the original function)
  return text.replace(/[^a-zA-Z0-9]/g, '')
}

import { Question } from '../types/questionnaireTypes';

export function areAllQuestionsAnswered(questions: Question[]): boolean {
  return questions.every(question => question.answer.value !== null);
}
