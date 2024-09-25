import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { openAi } from '../../../../shared/ai/open-ai';

export default Router().post('/gen-workout', async (req, res) => {
  const response = await openAi.generateWorkoutForADay(req.body);
  const { payload } = openAi.parseJSON(response);

  success(res, payload, 'Workout generated');
});
