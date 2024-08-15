import { z } from 'zod';
import { Decision } from './types';

const certificationSchema = z.nativeEnum(Decision).nullable().refine((value) => value !== null, { message: 'Please select an option' });

export const reviewSummarySchema = z.object({
  eight_a: certificationSchema,
  vosb: certificationSchema,
  edwosb: certificationSchema,
  hubZone: certificationSchema,
  commentsOnDisagreementEight_a: z.string().optional(),
  commentsOnDisagreementVosb: z.string().optional(),
  commentsOnDisagreementEdwosb: z.string().optional(),
  commentsOnDisagreementHubZone: z.string().optional(),
  reviewerAppealEight_a: certificationSchema.optional(),
  reviewerAppealVosb: certificationSchema.optional(),
  reviewerAppealEdwosb: certificationSchema.optional(),
  reviewerAppealHubZone: certificationSchema.optional(),
}).refine((data) => {
  if (data.eight_a === Decision.Disagree) {
    return !!data.commentsOnDisagreementEight_a &&
			data.commentsOnDisagreementEight_a.trim().length > 0 &&
			data.reviewerAppealEight_a !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['commentsOnDisagreementEight_a', 'reviewerAppealEight_a']
}).refine((data) => {
  if (data.vosb === Decision.Disagree) {
    return !!data.commentsOnDisagreementVosb &&
			data.commentsOnDisagreementVosb.trim().length > 0 &&
			data.reviewerAppealVosb !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['commentsOnDisagreementVosb', 'reviewerAppealVosb']
}).refine((data) => {
  if (data.edwosb === Decision.Disagree) {
    return !!data.commentsOnDisagreementEdwosb &&
			data.commentsOnDisagreementEdwosb.trim().length > 0 &&
			data.reviewerAppealEdwosb !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['commentsOnDisagreementEdwosb', 'reviewerAppealEdwosb']
}).refine((data) => {
  if (data.hubZone === Decision.Disagree) {
    return !!data.commentsOnDisagreementHubZone &&
			data.commentsOnDisagreementHubZone.trim().length > 0 &&
			data.reviewerAppealHubZone !== null;
  }
  return true;
}, {
  message: 'Please provide comments on the disagreement and select a reviewer appeal option',
  path: ['commentsOnDisagreementHubZone', 'reviewerAppealHubZone']
});

export const approvalLetterSchema = z.object({decision: z.boolean().refine((value) => value === true)});
export const declineLetterSchema = z.object({decision: z.boolean().refine((value) => value === true)});

export const schema = z.object({
  step: z.number().default(1),
  certifications: reviewSummarySchema,
  approvalLetter: approvalLetterSchema,
  declineLetter: declineLetterSchema,
});
