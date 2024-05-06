import { z } from 'zod';
import { errorMessages } from '../messages';

export const v_admin_user = z.object({
  id: z.number(errorMessages),
  name: z.string(errorMessages),
  email: z
    .string(errorMessages)
    .email()
    .transform((val) => val.trim()),
  password: z.string(errorMessages).transform((val) => val.trim()),
  active: z.boolean(errorMessages),
});

export type TAdminUser = z.infer<typeof v_admin_user>;
