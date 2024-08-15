import { z } from 'zod';
import { Decision } from './types';

const certificationSchema = z.nativeEnum(Decision).nullable().refine((value) => value !== null, { message: 'Please select an option' });

export const reviewSummarySchema = z.object({
  approvalEight_a: certificationSchema,
  approvalVosb: certificationSchema,
  approvalEdwosb: certificationSchema,
  approvalHubZone: certificationSchema,
  approvalCommentsOnDisagreementEight_a: z.string().optional(),
  approvalCommentsOnDisagreementVosb: z.string().optional(),
  approvalCommentsOnDisagreementEdwosb: z.string().optional(),
  approvalCommentsOnDisagreementHubZone: z.string().optional(),
  approvalReviewerAppealEight_a: certificationSchema.optional(),
  approvalReviewerAppealVosb: certificationSchema.optional(),
  approvalReviewerAppealEdwosb: certificationSchema.optional(),
  approvalReviewerAppealHubZone: certificationSchema.optional(),
}).refine((data) => {
  if (data.approvalEight_a === Decision.Disagree) {
    return !!data.approvalCommentsOnDisagreementEight_a &&
			data.approvalCommentsOnDisagreementEight_a.trim().length > 0 &&
			data.approvalReviewerAppealEight_a !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['approvalCommentsOnDisagreementEight_a', 'approvalReviewerAppealEight_a']
}).refine((data) => {
  if (data.approvalVosb === Decision.Disagree) {
    return !!data.approvalCommentsOnDisagreementVosb &&
			data.approvalCommentsOnDisagreementVosb.trim().length > 0 &&
			data.approvalReviewerAppealVosb !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['approvalCommentsOnDisagreementVosb', 'approvalReviewerAppealVosb']
}).refine((data) => {
  if (data.approvalEdwosb === Decision.Disagree) {
    return !!data.approvalCommentsOnDisagreementEdwosb &&
			data.approvalCommentsOnDisagreementEdwosb.trim().length > 0 &&
			data.approvalReviewerAppealEdwosb !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['approvalCommentsOnDisagreementEdwosb', 'approvalReviewerAppealEdwosb']
}).refine((data) => {
  if (data.approvalHubZone === Decision.Disagree) {
    return !!data.approvalCommentsOnDisagreementHubZone &&
			data.approvalCommentsOnDisagreementHubZone.trim().length > 0 &&
			data.approvalReviewerAppealHubZone !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['approvalCommentsOnDisagreementHubZone', 'approvalReviewerAppealHubZone']
});

export const approvalLetterSchema = z.object({approvalDecision: z.boolean().refine((value) => value === true)});
export const declineLetterSchema = z.object({approvalDecision: z.boolean().refine((value) => value === true)});

export const schema = z.object({
  step: z.number().default(1),
  certifications: reviewSummarySchema,
  approvalLetter: approvalLetterSchema,
  declineLetter: declineLetterSchema,
});
