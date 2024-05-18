import { Router } from 'express';
import { db } from '../../../../db/db';
import { TB_match } from '../../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';
import { success } from '../../../../shared/api-response/response-handler';

export default Router().get('/:id', async (req, res) => {
  const results = await db.query.TB_match.findFirst({
    where: eq(TB_match.id, parseInt(req.params.id)),
  });
  success(res, results, 'success');
});
