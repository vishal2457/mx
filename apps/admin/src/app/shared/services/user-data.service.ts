import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { TOrganisation, TUser } from '../../../../../../libs/mx-schema/src';
import { MeResponse } from '../types/me-response';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<Omit<TUser, 'password'> | null>(null);
  private organisation = new BehaviorSubject<MeResponse['organisation'] | null>(
    null,
  );
  private permissions = new BehaviorSubject<MeResponse['permissions']>([]);

  user$ = this.user.asObservable();
  organisation$ = this.organisation.asObservable();
  permissions$ = this.permissions.asObservable();

  setUser(user: Omit<TUser, 'password'>) {
    this.user.next(user);
  }

  setOrganisation(data: TOrganisation) {
    this.organisation.next(data);
  }

  setPermission(permissions: MeResponse['permissions']) {
    this.permissions.next(permissions);
  }

  getOrganisation() {
    return this.organisation.value;
  }

  getPermission(menuName: string, permissions: MeResponse['permissions']) {
    return permissions
      .filter((p) => p.rolePermission.menuName === menuName)
      .map((p) => p.rolePermission.permission);
  }
}
