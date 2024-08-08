export const MENU_OBJECT = {
  ANALYTICS: 'Analytics',
  MEMBERS: 'Members',
  WORKOUT: 'Workout',
  ENQUIRY: 'Enquiry',
  EXERCISE: 'Exercise',
  NOTIFICATION: 'Notification',
  USERS: 'Users',
  ROLES: 'Roles',
  PLAN: 'Plan',
  ORGANISATION: 'Organisation',
} as const;

export const MENU_DATA = [
  {
    name: 'Analytics',
    icon: 'analytics',
    link: '/analytics',
  },
  {
    name: 'Members',
    icon: 'groups',
    link: '/member/list',
  },
  {
    name: 'Workout',
    icon: 'summarize',
    link: '/workout-template/list',
  },
  {
    name: 'Enquiry',
    icon: 'info',
    link: '/enquiry/list',
  },
  {
    name: 'Exercise',
    icon: 'exercise',
    link: '/exercise/list',
  },
  {
    name: 'Notification',
    icon: 'notifications',
    link: '/notification/list',
  },
  {
    name: 'Users',
    icon: 'group',
    link: '/user/list',
  },
  {
    name: 'Roles',
    icon: 'assignment_ind',
    link: '/role/list',
  },
  {
    name: 'Plan',
    icon: 'description',
    link: '/plan/list',
  },
] as const;
