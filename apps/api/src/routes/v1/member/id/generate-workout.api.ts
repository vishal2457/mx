import { Router } from 'express';
import openAI from 'openai';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { APP_SETTINGS } from '../../../../shared/app-settings';
import { validate } from '../../../../shared/middlewares/validation.middleware';

// create a new instance of the openai API
const openai = new openAI({
  apiKey: APP_SETTINGS.OPEN_AI_API,
});

export default Router().post('/gen-workout', async (req, res) => {
  const {
    feeling,
    time,
    intensity,
    age,
    weight,
    height,
    gender,
    bmi,
    experience,
    goal,
    location,
  } = req.body;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a fitness trainer and you are creating a personalized workout plan for members.',
      },
      {
        role: 'user',
        content: `
          Age: ${age}, Weight: ${weight}, Height: ${height}, Gender: ${gender}, BMI: ${bmi}
          Experience Level: ${experience}, Goals: ${goal},
          I am feeling ${feeling} today, generate a workout of ${time} minutes with intensity ${intensity}. Include a warm-up of 5 minutes and a cool-down of 5 minutes. I am working out at ${location}

          Please provide the following information in this JSON format:

          {
            "status": "success",
            "data": [{
              "exerciseName": "string",
              "sets": "number",
              "reps": "string",
              "restTimeInMinutes": "string",
              "approxCalorieBurn": "number",
              "approxTimeInMinutes": "number"
              "intensity": "string"
            }],
            "feedbackRequest": "string"
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
});
