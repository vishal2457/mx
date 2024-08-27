import OpenAI from 'openai';
import { APP_SETTINGS } from './app-settings';

class OpenAi {
  constructor() {
    if (APP_SETTINGS.OPEN_AI_API) {
      this.instance = new OpenAI({
        apiKey: APP_SETTINGS.OPEN_AI_API,
      });
    }
  }
  private instance;

  generateWorkoutForADay(payload: any) {
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
    } = payload;
    return this.instance.chat.completions.create({
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
  }

  calculateCalories(payload: any) {
    const { exerciseName, sets, reps, intensity, age, weight, height, gender } =
      payload;
    return this.instance.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a fitness trainer and you will have to calculate approximate calorie burn based on details.',
        },
        {
          role: 'user',
          content: `
            Age: ${age}, Weight: ${weight}, Height: ${height}, Gender: ${gender}
            Exercise Name: ${exerciseName}, sets: ${sets}, Repetitions: ${reps}, intensity: ${intensity}
            I have done above exercise can you calculate approximate calories burnt in kcal, just give the json response without extra information

            Please provide the following information in this JSON format:

            {
              "status": "success",
              "data": {calorieBurn: number},
              "feedbackRequest": "string"
            }
            `,
        },
      ],
    });
  }

  parseJSON(response): { success: boolean; payload: any } {
    let content = response.choices[0].message.content;

    content = content.replace(/```json\n|```/g, '');

    try {
      const parsedContent = JSON.parse(content);
      return { success: true, payload: parsedContent };
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return { success: false, payload: response };
    }
  }
}

export const openAi = new OpenAi();
