import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { enquiryService } from './enquiry.service';

export default Router().get('/all', async (req, res) => {
  const result = await enquiryService.getAllEnquirys();
  success(res, result, 'success');
});
