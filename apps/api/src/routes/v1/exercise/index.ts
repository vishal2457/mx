import getExerciseList from './get-exercise-list.api';
import getAllExercise from './get-all-exercise.api';
import createExercise from './create-exercise.api';
import deleteExercise from './id/delete-exercise.api';
import updateExercise from './id/update-exercise.api';
import getExercise from './id/get-exercise.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const exercise = asyncHandler([
getExerciseList,
getExercise,
createExercise,
deleteExercise,
updateExercise,
getAllExercise
])
