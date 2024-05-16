import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { TB_notification } from '../../../../../../libs/mx-schema/src';

export default Router().post('/create', async (req, res) => {
  const results = await db.insert(TB_notification).values(req.body).returning();
  success(res, results, 'success');
});
