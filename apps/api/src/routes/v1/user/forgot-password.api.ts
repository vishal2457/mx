import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';

export default Router().post('/forgot-password', async (req, res) => {
  //implement forgot password functionality
  success(res, null, 'success');
});
