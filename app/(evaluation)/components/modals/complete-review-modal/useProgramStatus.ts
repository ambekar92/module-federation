import { useState, useEffect } from 'react';
import { Decision, ReviewSummaryType } from './types';
import { DocumentTemplateType } from '@/app/services/types/document-service/DocumentTemplate';

interface ProgramStatus {
  approvedPrograms: string[];
  declinedPrograms: string[];
  approvedLetters: DocumentTemplateType[];
  declinedLetters: DocumentTemplateType[];
  isLoading: boolean;
}

export const useProgramStatus = (reviewSummaryData: ReviewSummaryType | null): ProgramStatus => {
  const [status, setStatus] = useState<ProgramStatus>({
    approvedPrograms: [],
    declinedPrograms: [],
    approvedLetters: [],
    declinedLetters: [],
    isLoading: true,
  });

  useEffect(() => {
    if (reviewSummaryData) {
      const newStatus: ProgramStatus = {
        approvedPrograms: [],
        declinedPrograms: [],
        approvedLetters: [],
        declinedLetters: [],
        isLoading: false,
      };

      if (reviewSummaryData.sd_vosb === Decision.Concur) {
        newStatus.approvedPrograms.push('sd_vosb');
        newStatus.approvedLetters.push(DocumentTemplateType.vetCertApproval);
      }
      if (reviewSummaryData.wosb === Decision.Concur || reviewSummaryData.ed_wosb === Decision.Concur) {
        newStatus.approvedPrograms.push('wosb');
        newStatus.approvedLetters.push(DocumentTemplateType.wosbApproval);
      }
      if (reviewSummaryData.hubzone === Decision.Concur) {
        newStatus.approvedPrograms.push('hubzone');
        newStatus.approvedLetters.push(DocumentTemplateType.hubzoneApproval);
      }
      if (reviewSummaryData.eight_a === Decision.Concur) {
        newStatus.approvedPrograms.push('eight_a');
        newStatus.approvedLetters.push(DocumentTemplateType.eightAApproval);
      }

      if (reviewSummaryData.sd_vosb === Decision.Disagree ||
          (reviewSummaryData.sd_vosb === Decision.Concur && reviewSummaryData['reviewerAppeal-sd_vosb'] === 'yes')) {
        newStatus.declinedPrograms.push('sd_vosb');
        newStatus.declinedLetters.push(DocumentTemplateType.vetCertDecline);
      }
      if ((reviewSummaryData.wosb === Decision.Disagree || reviewSummaryData.ed_wosb === Decision.Disagree) ||
          ((reviewSummaryData.wosb === Decision.Concur || reviewSummaryData.ed_wosb === Decision.Concur) &&
          (reviewSummaryData['reviewerAppeal-wosb'] === 'yes' || reviewSummaryData['reviewerAppeal-ed_wosb'] === 'yes'))) {
        newStatus.declinedPrograms.push('wosb');
        newStatus.declinedLetters.push(DocumentTemplateType.generalDecline);
      }
      if (reviewSummaryData.hubzone === Decision.Disagree ||
          (reviewSummaryData.hubzone === Decision.Concur && reviewSummaryData['reviewerAppeal-hubzone'] === 'yes')) {
        newStatus.declinedPrograms.push('hubzone');
        newStatus.declinedLetters.push(DocumentTemplateType.hubzoneDecline);
      }
      if (reviewSummaryData.eight_a === Decision.Disagree ||
          (reviewSummaryData.eight_a === Decision.Concur && reviewSummaryData['reviewerAppeal-eight_a'] === 'yes')) {
        newStatus.declinedPrograms.push('eight_a');
        newStatus.declinedLetters.push(DocumentTemplateType.eightADecline);
      }

      setStatus(newStatus);
    }
  }, [reviewSummaryData]);

  return status;
};
