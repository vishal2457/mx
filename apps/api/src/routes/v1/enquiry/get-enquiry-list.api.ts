import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { enquiryService } from './enquiry.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/list', secure, async (req, res) => {
  const rows = await enquiryService.getEnquiryList(
    req.query,
    req.user.organisationID,
  );
  const [{ count }] = await enquiryService.getTotalCount(
    req.user.organisationID,
  );
  success(res, { rows, count }, 'success');
});
