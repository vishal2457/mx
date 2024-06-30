import { Router } from 'express';
import getUserList from './user/get-user-list.api';
import createuser from './user/create-user.api';
import deleteuser from './user/id/delete-user.api';
import loginuser from './user/login-user.api';
import getAllNotif from './notification/get-all-notif.api';
import createNotif from './notification/create-notif.api';
import createMenu from './menu/create-menu.api';
import getRoleList from './role/get-all-roles.api';
import createRole from './role/create-role.api';
import deleteRole from './role/id/delete-role.api';
import updateRole from './role/id/update-role.api';
import getRole from './role/id/get-role.api';
import getUserApi from './user/id/get-user.api';

import deleteNotif from './notification/id/delete-notif.api';
import { asyncHandler as ah } from '../../shared/async-handler.util';
import updateUserApi from './user/id/update-user.api';
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
    ])
  )
  .use('/notification', ah([getAllNotif, createNotif, deleteNotif]))
  .use('/menu', ah([createMenu]))
  .use('/role', ah([getRoleList, getRole, createRole, deleteRole, updateRole]));
// APPEND API ROUTES

export default routerv1;
