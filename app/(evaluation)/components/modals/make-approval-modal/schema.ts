import { z } from 'zod';
import { Decision } from './types';

export function generateReviewSummarySchema(programApplications: any[]) {
  const schemaFields: Record<string, any> = {};
  programApplications.forEach((program) => {
    const programName = program.programs.name;
    schemaFields[`approval${programName}`] = z.nativeEnum(Decision).optional();
    schemaFields[`approvalCommentsOnDisagreement-${programName}`] = z.string().optional();
    schemaFields[`approvalReviewerAppeal-${programName}`] = z.nativeEnum(Decision).optional();
  });

  return z.object(schemaFields).superRefine((data, ctx) => {
    programApplications.forEach((program) => {
      const programName = program.programs.name;
      if (data[`approval${programName}`] === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select a decision',
          path: [`approval${programName}`]
        });
      }
      if (data[`approval${programName}`] === Decision.Disagree) {
        if (!data[`approvalCommentsOnDisagreement-${programName}`] ||
            data[`approvalCommentsOnDisagreement-${programName}`].trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please provide comments on the disagreement',
            path: [`approvalCommentsOnDisagreement-${programName}`]
          });
        }
        if (program.reviewer_can_appeal && program.reviewer_decision === 'Concurs' && data[`approvalReviewerAppeal-${programName}`] === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select a reviewer appeal option',
            path: [`approvalReviewerAppeal-${programName}`]
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
