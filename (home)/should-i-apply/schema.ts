import { z } from "zod";
import { shouldIApply } from "./ownership/schema";
import { readinessSchema } from "./readiness/schema";
import { eligibilitySchema } from "./eligibility/schema";
import { matchSchema } from "./match/schema";

export const shouldIApplySchema = z.object({
    ownership: shouldIApply.optional(),
    readiness: readinessSchema.optional(),
    eligibility: eligibilitySchema.optional(),
    match: matchSchema.optional()
})

export type ShouldIApplyFormType = z.infer<typeof shouldIApplySchema>;  