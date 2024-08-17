import getMemberPlanList from './get-member-plan-list.api';
import getAllMemberPlan from './get-all-member-plan.api';
import createMemberPlan from './create-member-plan.api';
import deleteMemberPlan from './id/delete-member-plan.api';
import updateMemberPlan from './id/update-member-plan.api';
import getMemberPlan from './id/get-member-plan.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const memberPlan = asyncHandler([
getMemberPlanList,
getMemberPlan,
createMemberPlan,
deleteMemberPlan,
updateMemberPlan,
getAllMemberPlan
])
