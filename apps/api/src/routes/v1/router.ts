import { Router } from 'express';
import getUserList from './user/get-user-list.api';
import createuser from './user/create-user.api';
import deleteuser from './user/id/delete-user.api';
import loginuser from './user/login-user.api';
import getMatch from './match/id/get-match.api';
import createMatch from './match/create-match.api';
import deleteMatch from './match/id/delete-match.api';
import getAllMatch from './match/get-all-match.api';
import updateMatch from './match/id/update-match.api';
import getAllNotif from './notification/get-all-notif.api';
import createNotif from './notification/create-notif.api';
import createCustomer from './customer/create-customer.api';
import createMenu from './menu/create-menu.api';
import getRoleList from './role/get-all-roles.api';
import createRole from './role/create-role.api';
import deleteRole from './role/id/delete-role.api';
import updateRole from './role/id/update-role.api';
import getRole from './role/id/get-role.api';
import getUserApi from './user/id/get-user.api';
import createPaymentApi from './payment/create-payment.api';

import getOfferList from './offer/get-all-offers.api';
import createOffer from './offer/create-offer.api';
import deleteOffer from './offer/id/delete-offer.api';
import updateOffer from './offer/id/update-offer.api';
import getOffer from './offer/id/get-offer.api';
import verifyPaymentApi from './payment/verify-payment.api';
// IMPORT GENERATED FILES

const routerv1 = Router();

routerv1
  .use('/user', [getUserList, createuser, deleteuser, loginuser, getUserApi])
  .use('/match', [getAllMatch, getMatch, createMatch, deleteMatch, updateMatch])
  .use('/notification', [getAllNotif, createNotif])
  .use('/customer', [createCustomer])
  .use('/menu', [createMenu])
  .use('/role', [getRoleList, getRole, createRole, deleteRole, updateRole])
  .use('/payment', [createPaymentApi, verifyPaymentApi])
  .use('/offer', [
    getOfferList,
    updateOffer,
    getOffer,
    createOffer,
    deleteOffer,
  ]);
// APPEND API ROUTES

export default routerv1;
