import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { enquiryService } from './enquiry.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/count-status-open', secure, async (req, res) => {
  const [result] = await enquiryService.getStatusOpenCount(
    req.user.organisationID,
  );
  success(res, result, 'success');
});
