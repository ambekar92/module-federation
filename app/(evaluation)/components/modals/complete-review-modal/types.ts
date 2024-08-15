import { z } from 'zod';
import { approvalLetterSchema, declineLetterSchema, reviewSummarySchema, schema } from './schema';

export type CompleteReviewFormType = z.infer<typeof schema>;

export type ReviewSummaryType = z.infer<typeof reviewSummarySchema>;

export type ApprovalLetterType = z.infer<typeof approvalLetterSchema>;

export type DeclineLetterType = z.infer<typeof declineLetterSchema>;

export enum Decision {
    Concur = 'concur',
    Disagree = 'disagree'
}

export enum Steps {
    ReviewSummary = 1,
    ApprovalLetter = 2,
    DeclineLetter = 3
}
