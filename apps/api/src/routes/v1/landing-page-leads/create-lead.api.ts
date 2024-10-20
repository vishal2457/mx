import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import handler from '../../../shared/async-handler.util';
import { landingPageLeadService } from './landing-page-lead.service';

export default Router().post(
  '/create',
  handler(async (req, res) => {
    const users = await landingPageLeadService.create(req.body);
    success(res, users, 'success');
  }),
);
