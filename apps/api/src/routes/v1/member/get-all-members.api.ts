import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { memberService } from './member.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await memberService.getMemberList(req.query);
    const count = await memberService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
