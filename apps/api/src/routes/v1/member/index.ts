import getMemberList from './get-all-members.api';
import createMember from './create-member.api';
import deleteMember from './id/delete-member.api';
import updateMember from './id/update-member.api';
import getMember from './id/get-member.api';
import { asyncHandler } from '../../../shared/async-handler.util';


export const member = asyncHandler([getMemberList, getMember, createMember, deleteMember, updateMember])
