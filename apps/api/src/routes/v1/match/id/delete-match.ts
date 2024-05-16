import { Router } from 'express';
import { db } from '../../../../db/db';
import { TB_match } from '../../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';
import { success } from '../../../../shared/api-response/response-handler';

export default Router().delete('/:id', async (req, res) => {
  const results = await db
    .delete(TB_match)
    .where(eq(TB_match.id, parseInt(req.params.id)));
  success(res, results, 'success');
});
