import { z } from 'zod';

export const schema = z.object({
  response_body: z.string().min(1, 'Email reply cannot be empty'),
})

export type EmailContentReplyType = z.infer<typeof schema>;
