import { z } from 'zod';

export const schema = z.object({
  description: z.string().min(1, 'Please provide more information.'),
});
