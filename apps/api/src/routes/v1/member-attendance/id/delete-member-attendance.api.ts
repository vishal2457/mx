import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { memberAttendanceService } from '../member-attendance.service';

export default Router().delete(
  '/delete/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await memberAttendanceService.deleteMemberAttendance(req.params.id);
    success(res, result, 'Deleted successfully');
  }
);


