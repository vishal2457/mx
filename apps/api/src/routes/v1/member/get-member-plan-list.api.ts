import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { memberService } from './member.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/member-plan/list', secure, async (req, res) => {
  const rows = await memberService.getMemberList(
    req.query,
    req.user.organisationID,
  );
  const [countResult] = await memberService.memberPlanCount(
    req.user.organisationID,
  );
  success(res, { rows, count: countResult.count }, 'success');
});
