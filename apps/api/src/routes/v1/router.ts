import { Router } from 'express';
import getUserList from './user/get-user-list.api';
import createuser from './user/create-user.api';
import deleteuser from './user/id/delete-user.api';
import loginuser from './user/login-user.api';
import getAllNotif from './notification/get-all-notif.api';
import createNotif from './notification/create-notif.api';
import createMenu from './menu/create-menu.api';
import getRoleList from './role/get-role-list.api';
import createRole from './role/create-role.api';
import deleteRole from './role/id/delete-role.api';
import updateRole from './role/id/update-role.api';
import getRole from './role/id/get-role.api';
import getUserApi from './user/id/get-user.api';

import deleteNotif from './notification/id/delete-notif.api';
import { asyncHandler as ah } from '../../shared/async-handler.util';
import updateUserApi from './user/id/update-user.api';

import getPermissionList from './permission/get-all-permissions.api';
import createPermission from './permission/create-permission.api';
import deletePermission from './permission/id/delete-permission.api';
import updatePermission from './permission/id/update-permission.api';
import getPermission from './permission/id/get-permission.api';
import getRolePermissionList from './rolePermission/get-all-rolePermissions.api';
import createRolePermission from './rolePermission/create-rolePermission.api';
import deleteRolePermission from './rolePermission/id/delete-rolePermission.api';
import updateRolePermission from './rolePermission/id/update-rolePermission.api';
import getRolePermission from './rolePermission/id/get-rolePermission.api';
import getUserRoleList from './userRole/get-all-userRoles.api';
import createUserRole from './userRole/create-userRole.api';
import deleteUserRole from './userRole/id/delete-userRole.api';
import updateUserRole from './userRole/id/update-userRole.api';
import getUserRole from './userRole/id/get-userRole.api';
import getAllRolesApi from './role/get-all-roles.api';
import { userBookmark } from './user-bookmark';

import { systemConfig } from './system-config';

import { organisation } from './organisation';

import { plan } from './plan';

import { member } from './member';

import { memberAttendance } from './member-attendance';
import getAllUserApi from './user/get-all-user.api';

import { bodyPart } from './body-part';

import { exercise } from './exercise';

// IMPORT GENERATED FILES

const routerv1 = Router();

routerv1
  .use(
    '/user',
    ah([
      getUserList,
      createuser,
      deleteuser,
      loginuser,
      getUserApi,
      updateUserApi,
      getAllUserApi,
    ]),
  )
  .use('/notification', ah([getAllNotif, createNotif, deleteNotif]))
  .use('/menu', ah([createMenu]))
  .use(
    '/role',
    ah([
      getRoleList,
      getRole,
      createRole,
      deleteRole,
      updateRole,
      getAllRolesApi,
    ]),
  )
  .use(
    '/permission',
    ah([
      getPermissionList,
      getPermission,
      createPermission,
      deletePermission,
      updatePermission,
    ]),
  )
  .use(
    '/rolePermission',
    ah([
      getRolePermissionList,
      getRolePermission,
      createRolePermission,
      deleteRolePermission,
      updateRolePermission,
    ]),
  )
  .use(
    '/userRole',
    ah([
      getUserRoleList,
      getUserRole,
      createUserRole,
      deleteUserRole,
      updateUserRole,
    ]),
  )
  .use('/user-bookmark', userBookmark)
  .use('/system-config', systemConfig)
  .use('/organisation', organisation)
  .use('/plan', plan)
  .use('/member', member)
  .use('/member-attendance', memberAttendance)
  .use('/body-part', bodyPart)
  .use('/exercise', exercise);
// APPEND API ROUTES

export default routerv1;
