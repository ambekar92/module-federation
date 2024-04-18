import jsPDF from 'jspdf'
import { stateAbbreviations, SIAFormData } from './types';
import { SBA_LOGO_ONE_BASE64 as sbaLogoBase64 } from '../../../../constants/image';
export const checkIfUSAddress = (address: string): boolean => {
  // Check for ZIP code pattern
  const zipCodeRegex = /\b\d{5}(-\d{4})?\b/;
  const hasZipCode = zipCodeRegex.test(address);

  // Check for USA or United States
  const lowerCaseAddress = address.toLowerCase();
  const hasUSA = lowerCaseAddress.includes('usa')
	|| lowerCaseAddress.includes('united states')
	|| lowerCaseAddress.includes('u.s.a')
	|| lowerCaseAddress.includes('u.s.');

  // Check for state abbreviations
  const regex = new RegExp(`\\b(${stateAbbreviations.join('|')})\\b`, 'i');
  const hasStateAbbreviation = regex.test(address);

  return hasZipCode || hasUSA || hasStateAbbreviation;
};

function containsNoAnswer(answers: { answer: string }[]): boolean {
  return answers.some(answerItem => answerItem.answer.toLowerCase() === 'no');
}

export const exportPDF = (formData: SIAFormData) => {
  const doc = new jsPDF();

  const leftMargin = 20; // left margin in mm
  const pageWidth = 210; // A4 width in mm
  const maxWidth = pageWidth - 2 * leftMargin; // Calculates maximum width for text

  // Add the logo image
  const imgWidth = 26.17;
  const imgHeight = 20;
  const x = (pageWidth - imgWidth) / 2; // center horizontally
  const y = 10;
  doc.addImage(sbaLogoBase64, 'JPEG', x, y, imgWidth, imgHeight);

  // Positions the text following the image
  let currentYPosition = y + imgHeight + 10; // Adds 10 mm worth of space after image

  // "Should I Apply"
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Should I Apply', leftMargin, currentYPosition);
  currentYPosition += 10; // Adds space before

  doc.setFontSize(16);
  doc.text('Match: Do you sell what the government buys?', leftMargin, currentYPosition);
  currentYPosition += 10; // Adds space before

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const matchInfoParts = [
    `NAICS Code: ${formData.naicsCode}`,
    `Description: ${formData.description}`,
    `Amount awarded in FY21: ${formData.awardedFY21}`
  ];
  matchInfoParts.forEach((part) => {
    doc.text(part, leftMargin, currentYPosition);
    currentYPosition += 7; // Line spacing for each part
  });

  // qdditional space before the Readiness section
  currentYPosition += 10;

  // readiness Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const readinessTitle = 'Readiness: Is your business ready to take full advantage of the 8(a) Business Development Program?';
  const splitTitle = doc.splitTextToSize(readinessTitle, maxWidth);
  splitTitle.forEach((line: string) => {
    doc.text(line, leftMargin, currentYPosition);
    currentYPosition += 5;
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  currentYPosition += 5

  // defines the readiness answers and alerts
  const readinessQuestionsAnswers = [
    {
      question: 'Is your company generating revenue?',
      answer: formData.revenueResponse,
      noAlert: 'SBA requires two years of revenue to show that you are ready for the 8(a) Business Development Program. However, SBA may waive this requirement if you can provide other evidence that your company is ready for the program. '
    },
    {
      question: 'Do you have a track record of delivering quality goods and services on time and within budget?',
      answer: formData.qualityGoodsResponse,
      noAlert: 'The best way to show that your company is ready for the 8(a) Business Development Program is to have a track record of successful performance'
    },
    {
      question: 'Can you invoice and receive payments electronically?',
      answer: formData.electronicPaymentsResponse,
      noAlert: 'You will be required to invoice and receive payments electronically'
    },
    {
      question: 'Can you cover your costs (hire personnel, purchase equipment, cover overhead expenses, etc.) prior to receiving your first payment?',
      answer: formData.coverCostsResponse,
      noAlert: 'You\'ll need to have sufficient capital to cover contract start-up costs before you receive your first payment. Check out SBA\'s Fund Your Business for helpful resources'
    }
  ];

  const readinessAnswer = {
    no: 'Based on your responses, you may benefit from waiting to apply for the 8(a) Business Development Program until you are ready to take full advantage of the 9-year program term.',
    yes: 'Based on the responses you provided above, you appear ready to apply for the 8(a) Business Development Program.'
  }

  // writes each question for the readiness section with the alert if no
  readinessQuestionsAnswers.forEach((item, index) => {
    if(index !== 0) {currentYPosition += 10;}
    doc.setFont('helvetica', 'bold');
    doc.text(item.question, leftMargin, currentYPosition, { maxWidth });
    if(index === 1 || index === 3) {
      currentYPosition += 10;
    } else {
      currentYPosition += 5
    }
    doc.setFont('helvetica', 'normal');
    currentYPosition += 2;
    doc.text(`Answer: ${item.answer}`, leftMargin, currentYPosition, { maxWidth });
    if(item.answer === 'No') {
      currentYPosition += 10
      doc.setTextColor('red')
      doc.text(`${item.noAlert}`, leftMargin, currentYPosition, { maxWidth });
      if(index === 0 || index === 3) {
        currentYPosition += 10
      } else {
        currentYPosition += 5
      }
      doc.setTextColor('black')
    }
  });

  currentYPosition += 10;
  doc.setFont('helvetica', 'bold');
  // adds the footer for the readiness section
  if(containsNoAnswer(readinessQuestionsAnswers)) {
    doc.setFillColor(234, 197, 66); // yellow
    const boxYPosition = currentYPosition - 7; // adjusts Y position to align with the text
    const boxHeight = 22;
    doc.rect(leftMargin, boxYPosition, maxWidth, boxHeight, 'F');
    doc.text(readinessAnswer.no, leftMargin + 3, currentYPosition, { maxWidth:  166 }); // adds x-padding
  } else {
    doc.setFillColor(60, 125, 82); // green
    const boxYPosition = currentYPosition - 7; // adjust Y position to align with the text
    const boxHeight = 16;
    doc.rect(leftMargin, boxYPosition, maxWidth, boxHeight, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(readinessAnswer.yes, leftMargin + 3, currentYPosition, { maxWidth:  166 }); // adds x-padding
  }
  doc.setTextColor('black')
  currentYPosition += 15;

  doc.addPage();
  currentYPosition = 20;
  // Eligibility Section
  doc.setFontSize(16);
  const eligibilityTitle = 'Eligibility: Are you eligible for the 8(a) Business Development Program?';
  const splitEligibilityTitle = doc.splitTextToSize(eligibilityTitle, maxWidth);
  splitEligibilityTitle.forEach((line: string) => {
    doc.text(line, leftMargin, currentYPosition);
    currentYPosition += 5;
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  currentYPosition += 5

  // writes each question for the eligibility section with the alert if no
  const eligibilityQuestionsAnswers = [
    {
      question: 'Do you own and control a small business located in the U.S.?',
      answer: formData.usBusinessResponse,
      noAlert: 'You must own and control a small business in the U.S. to participate in the 8(a) Business Development Program'
    },
    {
      question: 'Are you under the financial limits?',
      answer: formData.financialLimitsResponse,
      noAlert: 'You must be economically disadvantaged to participate in the 8(a) Business Development Program'
    },
    {
      question: 'Can you provide reliable annual financial statements (Balance Sheet and Income Statement)?',
      answer: formData.financialStatementsResponse,
      noAlert: 'SBA needs to review reliable financial statements to determine if your company is ready for the 8(a) Business Development Program'
    },
    {
      question: 'Are you a U.S. citizen?',
      answer: formData.usCitizenResponse,
      noAlert: 'You must be a U.S. citizen to participate in the 8(a) Business Development Program'
    },
    {
      question: 'Are you a member of one of the following socially disadvantaged groups?',
      answer: formData.disadvantagedGroupResponse,
      noAlert: 'You must be socially disadvantaged to participate in the 8(a) Business Development Program'
    }
  ];

  const eligibilityAnswer = {
    no: 'Based on your responses, you are not eligible for the 8(a) Business Development Program. Review the eligibility criteria detailed here.',
    yes: 'Based on the responses you provided above, you appear ready to apply for the 8(a) Business Development Program.'
  }

  // writes each question for the readiness section with the alert if no
  eligibilityQuestionsAnswers.forEach((item, index) => {
    if(index !== 0) {currentYPosition += 10;}
    doc.setFont('helvetica', 'bold');
    doc.text(item.question, leftMargin, currentYPosition, { maxWidth });
    if(index === 2) {
      currentYPosition += 10;
    } else {
      currentYPosition += 5
    }
    doc.setFont('helvetica', 'normal');
    currentYPosition += 2;
    doc.text(`Answer: ${item.answer}`, leftMargin, currentYPosition, { maxWidth });
    if(item.answer === 'No') {
      currentYPosition += 10
      doc.setTextColor('red')
      doc.text(`${item.noAlert}`, leftMargin, currentYPosition, { maxWidth });
      if(index !== 3) {currentYPosition += 5}
      doc.setTextColor('black')
    }
  });

  currentYPosition += 15;
  doc.setFont('helvetica', 'bold');
  // adds the footer for the eligibility section
  if(containsNoAnswer(eligibilityQuestionsAnswers)) {
    doc.setFillColor(187, 38, 26); // red
    doc.setTextColor(255, 255, 255);
    const boxYPosition = currentYPosition - 7; // adjusts Y position to align with the text
    const boxHeight = 16;
    doc.rect(leftMargin, boxYPosition, maxWidth, boxHeight, 'F');
    doc.text(eligibilityAnswer.no, leftMargin + 3, currentYPosition, { maxWidth:  166 }); // adds x-padding
  } else {
    doc.setFillColor(60, 125, 82); // green
    const boxYPosition = currentYPosition - 7; // adjust Y position to align with the text
    const boxHeight = 16;
    doc.rect(leftMargin, boxYPosition, maxWidth, boxHeight, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(eligibilityAnswer.yes, leftMargin + 3, currentYPosition, { maxWidth:  166 }); // adds x-padding
  }
  // saves the PDF
  doc.save('should-i-apply.pdf');
};
