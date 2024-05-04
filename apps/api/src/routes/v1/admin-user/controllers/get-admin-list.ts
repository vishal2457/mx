import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { TB_adminUser } from '../../../../db/schema/admin-user.schema';

export default Router().get(
  '/list',
  ah(async (req, res) => {
    success(res, {}, 'success');
  })
);
