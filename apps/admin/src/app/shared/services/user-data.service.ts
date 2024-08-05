import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOrganisation, TUser } from '../../../../../../libs/mx-schema/src';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<Omit<TUser, 'password'> | null>(null);
  private organisation = new BehaviorSubject<TOrganisation | null>(null);
  user$ = this.user.asObservable();
  organisation$ = this.organisation.asObservable();

  setUser(user: Omit<TUser, 'password'>) {
    this.user.next(user);
  }

  setOrganisation(data: TOrganisation) {
    this.organisation.next(data);
  }

  getOrganisation() {
    return this.organisation.value;
  }
}
