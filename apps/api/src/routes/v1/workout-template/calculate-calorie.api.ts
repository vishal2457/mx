import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { openAi } from '../../../shared/ai/open-ai';

export default Router().post('/calculate-calories', async (req, res) => {
  const response = await openAi.calculateCalories(req.body);
  const { payload } = openAi.parseJSON(response);
  success(res, payload, 'generated');
});
