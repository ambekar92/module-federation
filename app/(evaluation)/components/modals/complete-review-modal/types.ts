import { z } from 'zod';
import { approvalLetterSchema, declineLetterSchema, schema } from './schema';

export type ReviewSummaryType = Record<string, any>; // This will be inferred dynamically
export type ApprovalLetterType = z.infer<typeof approvalLetterSchema>;
export type DeclineLetterType = z.infer<typeof declineLetterSchema>;
export type CompleteReviewFormType = z.infer<typeof schema> & {reviewSummary?: ReviewSummaryType;};

export enum Decision {
  Concur = 'concur',
  Disagree = 'disagree'
}

export enum Steps {
  ReviewSummary = 1,
  ApprovalLetter = 2,
  DeclineLetter = 3
}
