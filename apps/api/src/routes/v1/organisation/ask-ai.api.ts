import { Router } from 'express';
import { askDB } from '../../../shared/ai/langchain-openai';
import { success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { z } from 'zod';

export default Router().get(
  '/ask-ai',
  secure,
  validate({ query: z.object({ qsn: z.string() }) }),
  async (req, res) => {
    const result = await askDB.query(req.query.qsn as string);
    success(res, result, 'success');
  },
);
