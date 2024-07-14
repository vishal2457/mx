import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { memberAttendanceService } from './member-attendance.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await memberAttendanceService.getMemberAttendanceList(req.query);
    const count = await memberAttendanceService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
