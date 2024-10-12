import { useState, useEffect } from 'react';
import { Decision, ReviewSummaryType } from './types';
import { DocumentTemplateType } from '@/app/services/types/document-service/DocumentTemplate';
import { ReviewerDecisionType } from '../make-approval-modal/types';

interface ProgramStatus {
  approvedPrograms: string[];
  declinedPrograms: string[];
  approvedLetters: DocumentTemplateType[];
  declinedLetters: DocumentTemplateType[];
  isLoading: boolean;
}

export const useProgramStatus = (reviewSummaryData: ReviewSummaryType | null, analystDecisions: ReviewerDecisionType[]): ProgramStatus => {
  const [status, setStatus] = useState<ProgramStatus>({
    approvedPrograms: [],
    declinedPrograms: [],
    approvedLetters: [DocumentTemplateType.generalApproval],
    declinedLetters: [DocumentTemplateType.generalDecline],
    isLoading: true,
  });

  useEffect(() => {
    if (reviewSummaryData && analystDecisions.length > 0) {
      const newStatus: ProgramStatus = {
        approvedPrograms: [],
        declinedPrograms: [],
        approvedLetters: [DocumentTemplateType.generalApproval],
        declinedLetters: [],
        isLoading: false,
      };

      const isApproved = (programName: string) =>
        analystDecisions.some(decision => decision.name === programName && decision.value === 'approved');

      // Combined VOSB and SD-VOSB logic
      let vosbDeclined = false;
      if (reviewSummaryData.vosb !== undefined || reviewSummaryData.sd_vosb !== undefined) {
        if ((reviewSummaryData.vosb === Decision.Concur && isApproved('vosb')) ||
            (reviewSummaryData.sd_vosb === Decision.Concur && isApproved('sd_vosb')) ||
            (reviewSummaryData.vosb === Decision.Disagree && !isApproved('vosb')) ||
            (reviewSummaryData.sd_vosb === Decision.Disagree && !isApproved('sd_vosb'))) {
          if (reviewSummaryData.vosb !== undefined) {
            newStatus.approvedPrograms.push('vosb');
          }
          if (reviewSummaryData.sd_vosb !== undefined) {
            newStatus.approvedPrograms.push('sd_vosb');
          }
          newStatus.approvedLetters.push(DocumentTemplateType.vetCertApproval);
        } else {
          if (reviewSummaryData.vosb !== undefined && (reviewSummaryData.vosb === Decision.Disagree || !isApproved('vosb'))) {
            newStatus.declinedPrograms.push('vosb');
          }
          if (reviewSummaryData.sd_vosb !== undefined && (reviewSummaryData.sd_vosb === Decision.Disagree || !isApproved('sd_vosb'))) {
            newStatus.declinedPrograms.push('sd_vosb');
          }
          vosbDeclined = true;
        }
      }

      // WOSB
      let wosbDeclined = false;
      if (reviewSummaryData.wosb !== undefined) {
        if ((reviewSummaryData.wosb === Decision.Concur && isApproved('wosb')) ||
      (reviewSummaryData.wosb === Decision.Disagree && !isApproved('wosb'))) {
          newStatus.approvedPrograms.push('wosb');
          if (!newStatus.approvedLetters.includes(DocumentTemplateType.wosbApproval)) {
            newStatus.approvedLetters.push(DocumentTemplateType.wosbApproval);
          }
        } else {
          newStatus.declinedPrograms.push('wosb');
          wosbDeclined = true;
        }
      }

      // EDWOSB
      let edwosbDeclined = false;
      if (reviewSummaryData.ed_wosb !== undefined) {
        if ((reviewSummaryData.ed_wosb === Decision.Concur && isApproved('ed_wosb')) ||
      (reviewSummaryData.ed_wosb === Decision.Disagree && !isApproved('ed_wosb'))) {
          newStatus.approvedPrograms.push('ed_wosb');
          if (!newStatus.approvedLetters.includes(DocumentTemplateType.wosbApproval)) {
            newStatus.approvedLetters.push(DocumentTemplateType.wosbApproval);
          }
        } else {
          newStatus.declinedPrograms.push('ed_wosb');
          edwosbDeclined = true;
        }
      }

      // HUBZone
      if (reviewSummaryData.hubzone !== undefined) {
        if ((reviewSummaryData.hubzone === Decision.Concur && isApproved('hubzone')) ||
            (reviewSummaryData.hubzone === Decision.Disagree && !isApproved('hubzone'))) {
          newStatus.approvedPrograms.push('hubzone');
          newStatus.approvedLetters.push(DocumentTemplateType.hubzoneApproval);
        } else {
          newStatus.declinedPrograms.push('hubzone');
        }
      }

      // 8(a)
      if (reviewSummaryData.eight_a !== undefined) {
        if ((reviewSummaryData.eight_a === Decision.Concur && isApproved('eight_a')) ||
            (reviewSummaryData.eight_a === Decision.Disagree && !isApproved('eight_a'))) {
          newStatus.approvedPrograms.push('eight_a');
          newStatus.approvedLetters.push(DocumentTemplateType.eightAApproval);
        } else {
          newStatus.declinedPrograms.push('eight_a');
        }
      }

      // Add specific decline letters
      if (vosbDeclined) {
        newStatus.declinedLetters.push(
          (reviewSummaryData['reviewerAppeal-vosb'] === 'yes' || reviewSummaryData['reviewerAppeal-sd_vosb'] === 'yes')
            ? DocumentTemplateType.vetCertDeclineAppeal
            : DocumentTemplateType.vetCertDecline
        );
      }
      if (wosbDeclined || edwosbDeclined) {
        newStatus.declinedLetters.push(DocumentTemplateType.wosbDecline);
      }
      if (newStatus.declinedPrograms.includes('hubzone')) {
        newStatus.declinedLetters.push(DocumentTemplateType.hubzoneDecline);
      }
      if (newStatus.declinedPrograms.includes('eight_a')) {
        newStatus.declinedLetters.push(DocumentTemplateType.eightADecline);
      }

      setStatus(newStatus);
    }
  }, [reviewSummaryData, analystDecisions]);

  return status;
};
