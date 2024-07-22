import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TUser } from '../../../../../../libs/mx-schema/src';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<Omit<TUser, 'password'> | null>(null);
  user$ = this.user.asObservable();

  setUser(user: Omit<TUser, 'password'>) {
    this.user.next(user);
  }
}
