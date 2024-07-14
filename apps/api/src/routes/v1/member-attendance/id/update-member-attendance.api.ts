import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_memberAttendance,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { memberAttendanceService } from '../member-attendance.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_memberAttendance),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await memberAttendanceService.updateMemberAttendance(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
