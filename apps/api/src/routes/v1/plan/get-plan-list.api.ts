import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { planService } from './plan.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/list', secure, async (req, res) => {
  const rows = await planService.getPlanList(
    req.query,
    req.user.organisationID,
  );
  const [{ count }] = await planService.getTotalCount(req.user.organisationID);
  success(res, { rows, count }, 'success');
});
