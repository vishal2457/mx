import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_memberAttendance } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { memberAttendanceService } from './member-attendance.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_memberAttendance) }),
  async (req, res) => {
    const result = await memberAttendanceService.createMemberAttendance(req.body);
    success(res, result, 'success');
  }
);
