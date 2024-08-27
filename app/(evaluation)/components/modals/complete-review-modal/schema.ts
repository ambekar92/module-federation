import { z } from 'zod';
import { Decision } from './types';

export function generateReviewSummarySchema(programApplications: any[]) {
  const schemaFields: Record<string, any> = {};
  programApplications.forEach((program) => {
    const programName = program.programs.name;
    schemaFields[programName] = z.nativeEnum(Decision).optional();
    schemaFields[`commentsOnDisagreement-${programName}`] = z.string().optional();
    schemaFields[`reviewerAppeal-${programName}`] = z.nativeEnum(Decision).optional();
  });

  return z.object(schemaFields).superRefine((data, ctx) => {
    programApplications.forEach((program) => {
      const programName = program.programs.name;
      if (data[programName] === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select a decision',
          path: [programName]
        });
      }
      if (data[programName] === Decision.Disagree) {
        if (!data[`commentsOnDisagreement-${programName}`] ||
            data[`commentsOnDisagreement-${programName}`].trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please provide comments on the disagreement',
            path: [`commentsOnDisagreement-${programName}`]
          });
        }
        if (program.reviewer_can_appeal && program.reviewer_decision === 'Concurs' && data[`reviewerAppeal-${programName}`] === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select a reviewer appeal option',
            path: [`reviewerAppeal-${programName}`]
          });
        }
      }
    });
  });
}

export const approvalLetterSchema = z.object({
  approvalDecisions: z.boolean()
});
export const declineLetterSchema = z.object({
  approvalDecisions: z.boolean()
});

export const schema = z.object({
  step: z.number().default(1),
  approvalLetter: approvalLetterSchema,
  declineLetter: declineLetterSchema,
  reviewSummary: z.record(z.any()).optional(),
});

// This is a placeholder the actual schema will be generated dynamically -KJ
export const reviewSummarySchema = z.any();
