import { z } from 'zod';
import { schema } from './schema';

export type ProvideOpinionFormType = z.infer<typeof schema>;
