import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const [result] = await memberService.getByID(req.params.id);
    delete result.member.createdAt;
    delete result.member.updatedAt;

    const [memberTotalSpent] = await memberService.getMemberTotalSpent(
      req.params.id,
    );

    success(
      res,
      {
        details: result.member,
        memberTotalSpent,
        workoutTemplate: result.workoutTemplate,
      },
      'Member Details',
    );
  },
);
