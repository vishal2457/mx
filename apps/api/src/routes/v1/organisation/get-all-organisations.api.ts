import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { organisationService } from './organisation.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await organisationService.getOrganisationList(req.query);
    const count = await organisationService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
