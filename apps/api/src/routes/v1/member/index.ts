import getMemberList from './get-all-members.api';
import createMember from './create-member.api';
import deleteMember from './id/delete-member.api';
import updateMember from './id/update-member.api';
import getMember from './id/get-member.api';
import { asyncHandler } from '../../../shared/async-handler.util';
import renewMembershipApi from './id/renew-membership.api';
import getMembershipByMemberidApi from './id/get-membership-by-memberid.api';
import updateWeightApi from './id/update-weight.api';
import loginMemberApi from './login-member.api';
import getWeightHistoryApi from './stats/get-weight-history.api';
import getCountNewByMonth from './stats/get-count-new-by-month';
import getRevenueByMonthApi from './stats/get-revenue-by-month.api';
import getMemberCountApi from './stats/get-member-count.api';
import getActiveMembershipApi from './id/get-active-membership.api';
import getLastNMonthRevenueApi from './stats/get-last-n-month-revenue.api';
import updateProfilePicApi from './id/update-profile-pic.api';
import logWorkoutApi from './id/log-workout.api';
import getTodaysWorkoutApi from './id/get-todays-workout.api';
import deleteMemberWorkoutApi from './id/delete-member-workout.api';
import getLastNMonthsWorkoutLogsApi from './stats/get-last-n-months-workout-logs.api';
import getMemberPlanListApi from './get-member-plan-list.api';
import getWorkoutLogApi from './id/get-workout-log.api';
import generateWorkoutApi from './id/generate-workout.api';
import updateMembershipApi from './id/update-membership.api';
import getMembersAtRiskApi from './stats/get-members-at-risk.api';
import memberMeApi from './member-me.api';

export const member = asyncHandler([
  getMemberList,
  getMember,
  createMember,
  deleteMember,
  updateMember,
  renewMembershipApi,
  getMembershipByMemberidApi,
  updateWeightApi,
  loginMemberApi,
  getWeightHistoryApi,
  getCountNewByMonth,
  getRevenueByMonthApi,
  getMemberCountApi,
  getActiveMembershipApi,
  getLastNMonthRevenueApi,
  updateProfilePicApi,
  logWorkoutApi,
  getTodaysWorkoutApi,
  deleteMemberWorkoutApi,
  getLastNMonthsWorkoutLogsApi,
  getMemberPlanListApi,
  getWorkoutLogApi,
  generateWorkoutApi,
  updateMembershipApi,
  getMembersAtRiskApi,
  memberMeApi,
]);
