import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { bodyPartService } from './body-part.service';

export default Router().get('/all', async (req, res) => {
  const result = await bodyPartService.getAllBodyParts();
  success(res, result, 'success');
});
