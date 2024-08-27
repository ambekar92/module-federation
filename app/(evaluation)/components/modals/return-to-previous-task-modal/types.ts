import { z } from 'zod';
import { schema } from './schema';

export enum ReturnToType {
    Screener = 'Screener',
    Analyst = 'Analyst',
    Reviewer = 'Reviewer',
}

export type ReturnToFormType = z.infer<typeof schema>;
