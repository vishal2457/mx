import { Router } from 'express';
import getUserList from './user/get-user-list';
import createuser from './user/create-user';
import deleteuser from './user/id/delete-user';
import loginuser from './user/login-user';
import getMatch from './match/id/get-match';
import createMatch from './match/create-match';
import deleteMatch from './match/id/delete-match';
import getAllMatch from './match/get-all-match';
import updateMatch from './match/id/update-match';
import getAllNotif from './notification/get-all-notif';
import createNotif from './notification/create-notif';
import createCustomer from './customer/create-customer';
import createMenu from './menu/create-menu';

const routerv1 = Router();

routerv1
  .use('/user', [getUserList, createuser, deleteuser, loginuser])
  .use('/match', [getAllMatch, getMatch, createMatch, deleteMatch, updateMatch])
  .use('/notification', [getAllNotif, createNotif])
  .use('/customer', [createCustomer])
  .use('/menu', [createMenu]);

export default routerv1;
