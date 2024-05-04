import { Router } from 'express';
import getAdminList from './admin-user/controllers/get-admin-list';
import createAdmin from './admin-user/controllers/create-admin';

const routerv1 = Router();

routerv1.use('/admin', [getAdminList, createAdmin]);

export default routerv1;
