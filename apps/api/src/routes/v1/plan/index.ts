import getPlanList from './get-plan-list.api';
import createPlan from './create-plan.api';
import deletePlan from './id/delete-plan.api';
import updatePlan from './id/update-plan.api';
import getPlan from './id/get-plan.api';
import { asyncHandler } from '../../../shared/async-handler.util';

export const plan = asyncHandler([
  getPlanList,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
]);
