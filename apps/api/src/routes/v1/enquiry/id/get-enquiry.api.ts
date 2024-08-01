import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { enquiryService } from '../enquiry.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const [result] = await enquiryService.getByID(req.params.id);
    const enquiryStatusHistory = await enquiryService.getStatusHistory(
      req.params.id,
    );
    success(res, { detail: result, enquiryStatusHistory }, 'Enquiry Details');
  },
);
