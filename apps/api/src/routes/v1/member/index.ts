import getMemberList from './get-all-members.api';
import createMember from './create-member.api';
import deleteMember from './id/delete-member.api';
import updateMember from './id/update-member.api';
import getMember from './id/get-member.api';
import { asyncHandler } from '../../../shared/async-handler.util';
import renewMembershipApi from './id/renew-membership.api';
import getMembershipByMemberidApi from './id/get-membership-by-memberid.api';

export const member = asyncHandler([
  getMemberList,
  getMember,
  createMember,
  deleteMember,
  updateMember,
  renewMembershipApi,
  getMembershipByMemberidApi,
]);
