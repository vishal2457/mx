import getMemberAttendanceList from './get-all-member-attendances.api';
import createMemberAttendance from './create-member-attendance.api';
import deleteMemberAttendance from './id/delete-member-attendance.api';
import updateMemberAttendance from './id/update-member-attendance.api';
import getMemberAttendance from './id/get-member-attendance.api';
import { asyncHandler } from '../../../shared/async-handler.util';

export const memberAttendance = asyncHandler([
  getMemberAttendanceList,
  getMemberAttendance,
  createMemberAttendance,
  deleteMemberAttendance,
  updateMemberAttendance,
]);
