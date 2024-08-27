import { render, screen } from '@testing-library/react'
import SIAQuestionSections from '../components/SIAQuestionSections'

describe('SIAQuestionSections', () => {
  test('SIAQuestionSections component renders', () => {
    render(<SIAQuestionSections />)
  })

  describe('readiness questions', () => {
    test('\'Is your company generating revenue?\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(/is your company generating revenue\?/i);
      expect(questionEl).toBeInTheDocument()
    })
    test('\'can you invoice and receive payments electronically\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(/can you invoice and receive payments electronically\?/i);
      expect(questionEl).toBeInTheDocument();
    })
    test('\'do you have a track record of delivering quality goods...\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(  /do you have a track record of delivering quality goods and services on time and within budget\?/i  )
      expect(questionEl).toBeInTheDocument();
    })
    test('\'can you cover your costs prior to receiving your first payment?\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(  /can you cover your costs prior to receiving your first payment\?/i)
      expect(questionEl).toBeInTheDocument();
    })

  })
  describe('\'do you own and control a small business located in the US\' is visible', () => {
    test('\'Is your company generating revenue?\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(  /do you own and control a small business located in the u\.s\.\?/i)
      expect(questionEl).toBeInTheDocument()
    })
    test('\'can you provide reliable annual financial statements...\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(  /can you provide reliable annual financial statements \(balance sheet and income statement\)\?/i  )
      expect(questionEl).toBeInTheDocument();
    })
    test('\'can you provide detail of how your social disadvantage has hurt your business?\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(  /can you provide detail of how your social disadvantage has hurt your business\?/i  )
      expect(questionEl).toBeInTheDocument();
    })
    test('\'are you under the financial limits?\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(/are you under the financial limits\?/i)
      expect(questionEl).toBeInTheDocument();
    })
    test('\'are you a us c?\' is visible', () => {
      render(<SIAQuestionSections />)
      const questionEl = screen.getByText(/are you a u\.s\. citizen\?/i)
      expect(questionEl).toBeInTheDocument();
    })

  })
})
