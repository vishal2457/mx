import getWorkoutTemplateList from './get-workout-template-list.api';
import getAllWorkoutTemplate from './get-all-workout-template.api';
import createWorkoutTemplate from './create-workout-template.api';
import deleteWorkoutTemplate from './id/delete-workout-template.api';
import updateWorkoutTemplate from './id/update-workout-template.api';
import getWorkoutTemplate from './id/get-workout-template.api';
import { asyncHandler } from '../../../shared/async-handler.util';
import calculateCalorieApi from './calculate-calorie.api';

export const workoutTemplate = asyncHandler([
  getWorkoutTemplateList,
  getWorkoutTemplate,
  createWorkoutTemplate,
  deleteWorkoutTemplate,
  updateWorkoutTemplate,
  getAllWorkoutTemplate,
  calculateCalorieApi,
]);
