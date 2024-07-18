import getBodyPartList from './get-body-part-list.api';
import getAllBodyPart from './get-all-body-part.api';
import createBodyPart from './create-body-part.api';
import deleteBodyPart from './id/delete-body-part.api';
import updateBodyPart from './id/update-body-part.api';
import getBodyPart from './id/get-body-part.api';
import { asyncHandler } from '../../../shared/async-handler.util';

export const bodyPart = asyncHandler([
  getBodyPartList,
  getBodyPart,
  createBodyPart,
  deleteBodyPart,
  updateBodyPart,
  getAllBodyPart,
]);
