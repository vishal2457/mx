import { Router } from 'express';
import createMenu from './menu/create-menu.api';
import createNotif from './notification/create-notif.api';
import getAllNotif from './notification/get-all-notif.api';
import createRole from './role/create-role.api';
import getRoleList from './role/get-role-list.api';
import deleteRole from './role/id/delete-role.api';
import getRole from './role/id/get-role.api';
import updateRole from './role/id/update-role.api';
import createuser from './user/create-user.api';
import getUserList from './user/get-user-list.api';
import deleteuser from './user/id/delete-user.api';
import getUserApi from './user/id/get-user.api';
import loginuser from './user/login-user.api';

import { asyncHandler as ah } from '../../shared/async-handler.util';
import deleteNotif from './notification/id/delete-notif.api';
import updateUserApi from './user/id/update-user.api';

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

import meApi from './user/me.api';
import { workoutTemplate } from './workout-template';

import { enquiry } from './enquiry';

import { memberPlan } from './member-plan';

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
      meApi,
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
  .use('/user-bookmark', userBookmark)
  .use('/system-config', systemConfig)
  .use('/organisation', organisation)
  .use('/plan', plan)
  .use('/member', member)
  .use('/member-attendance', memberAttendance)
  .use('/body-part', bodyPart)
  .use('/exercise', exercise)
  .use('/workout-template', workoutTemplate)
  .use('/enquiry', enquiry);
// APPEND API ROUTES

export default routerv1;
