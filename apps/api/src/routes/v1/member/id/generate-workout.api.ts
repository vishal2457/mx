import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { memberService } from '../member.service';
import openAI from 'openai';
import { APP_SETTINGS } from '../../../../shared/app-settings';

// create a new instance of the openai API
const openai = new openAI({
  apiKey: APP_SETTINGS.OPEN_AI_API,
});

export default Router().get(
  '/gen-workout/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const [result] = await memberService.getByID(req.params.id);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a fitness trainer and you are creating a workout plan for a new member',
        },
        {
          role: 'user',
          content: `
        Name: ${result.member.name}, Age: ${result.member.age}, Weight: ${result.member.weight}, Height: ${result.member.height},
        i am feeling energetic today, generate a workout of 45 mins to burn weight
        Please provide the following information in this JSON format:

{
  "status": "success",
  "data": [{
    "exerciseName": "string",
    "sets": "number",
    "reps": "string",
    restTimeInMinutes: "string",
    "approxCalorieBurn": "number",
    "approxTime": "string",
      }]
}
        `,
        },
      ],
    });

    let content = response.choices[0].message.content;

    // Step 2: Clean the content by removing the triple backticks and the "json" identifier
    content = content.replace(/```json\n|```/g, '');

    try {
      const parsedContent = JSON.parse(content);
      success(res, parsedContent, 'generated');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      success(res, response, 'generated');
    }
  },
);
