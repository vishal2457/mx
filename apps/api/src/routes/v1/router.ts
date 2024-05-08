import { Router } from 'express';
import getUserList from './user/get-user-list';
import createuser from './user/create-user';
import deleteuser from './user/id/delete-user';
import loginuser from './user/login-user';

const routerv1 = Router();

routerv1.use('/user', [getUserList, createuser, deleteuser, loginuser]);

export default routerv1;
