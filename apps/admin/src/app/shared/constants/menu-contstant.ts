import { RESOURCES } from '../../../../../../libs/mx-schema/src';

export const MENU_DATA = [
  {
    name: RESOURCES.ANALYTICS,
    icon: 'analytics',
    link: '/analytics',
  },
  {
    name: RESOURCES.MEMBERS,
    icon: 'groups',
    link: '/member/list',
  },
  {
    name: RESOURCES.WORKOUT,
    icon: 'notebook',
    link: '/workout-template/list',
  },
  {
    name: RESOURCES.ENQUIRY,
    icon: 'info',
    link: '/enquiry/list',
  },
  {
    name: RESOURCES.EXERCISE,
    icon: 'exercise',
    link: '/exercise/list',
  },
  // {
  //   name: RESOURCES.NOTIFICATION,
  //   icon: 'notifications',
  //   link: '/notification/list',
  // },
  {
    name: RESOURCES.USERS,
    icon: 'group',
    link: '/user/list',
  },
  {
    name: RESOURCES.ROLES,
    icon: 'contact-round',
    link: '/role/list',
  },
  {
    name: RESOURCES.PLAN,
    icon: 'description',
    link: '/plan/list',
  },
  {
    name: RESOURCES.MEMBER_PLAN,
    icon: 'file-text',
    link: '/member-plan/list',
  },
] as const;
