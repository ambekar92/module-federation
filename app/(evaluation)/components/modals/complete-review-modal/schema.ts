import { z } from 'zod';
import { Desicion } from './types';

const certificationSchema = z.nativeEnum(Desicion).nullable().refine((value) => value !== null, { message: "Please select an option" });

export const reviewSummarySchema = z.object({
    eight_a: certificationSchema,
    vosb: certificationSchema,
    edwosb: certificationSchema,
    hubZone: certificationSchema,
    commentsOnDisagreementEight_a: z.string().optional(),
    commentsOnDisagreementVosb: z.string().optional(),
    commentsOnDisagreementEdwosb: z.string().optional(),
    commentsOnDisagreementHubZone: z.string().optional(),
  }).refine((data) => {
      if (data.eight_a === Desicion.Disagree) {
          return !!data.commentsOnDisagreementEight_a && data.commentsOnDisagreementEight_a.trim().length > 0;
      };
      return true;
  }, {
      message: "Please provide comments on the disagreement",
      path: ["commentsOnDisagreementEight_a"]
  }).refine((data) => {
        if (data.vosb === Desicion.Disagree) {
            return !!data.commentsOnDisagreementVosb && data.commentsOnDisagreementVosb.trim().length > 0;
        };
        return true;
  }, {
        message: "Please provide comments on the disagreement",
        path: ["commentsOnDisagreementVosb"]
  }).refine((data) => {
        if (data.edwosb === Desicion.Disagree) {
            return !!data.commentsOnDisagreementEdwosb && data.commentsOnDisagreementEdwosb.trim().length > 0;
        };
        return true
  }, {
        message: "Please provide comments on the disagreement",
        path: ["commentsOnDisagreementEdwosb"]
  }).refine((data) => {
        if (data.hubZone === Desicion.Disagree) {
            return !!data.commentsOnDisagreementHubZone && data.commentsOnDisagreementHubZone.trim().length > 0;
        };
        return true
  }, {
    message: "Please provide comments on the disagreement",
    path: ["commentsOnDisagreementHubZone"]
  });

export const approvalLetterSchema = z.object({decision: z.boolean().refine((value) => value === true)});
export const declineLetterSchema =z.object({decision: z.boolean().refine((value) => value === true)});;

export const schema = z.object({
    step: z.number().default(1),
    certifications: reviewSummarySchema,
    approvalLetter: approvalLetterSchema,
    declineLetter: declineLetterSchema,
})





