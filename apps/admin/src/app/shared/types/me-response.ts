import { TOrganisation, TUser } from '../../../../../../libs/mx-schema/src';

export interface MeResponse {
  permissions: Array<{
    rolePermission: {
      id: number;
      permission: string;
      menuName: string;
      roleID: number;
    };
    role: {
      id: number;
      name: string;
      description: string;
      organisationID: number;
    };
    userRole: {
      id: number;
      roleID: number;
      userID: number;
    };
  }>;
  user: Omit<TUser, 'password'>;
  organisation: TOrganisation;
}
