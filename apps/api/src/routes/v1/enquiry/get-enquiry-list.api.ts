import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { enquiryService } from './enquiry.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await enquiryService.getEnquiryList(req.query);
    const count = await enquiryService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
