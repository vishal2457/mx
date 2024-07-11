import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_organisation,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { organisationService } from '../organisation.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_organisation),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await organisationService.updateOrganisation(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
