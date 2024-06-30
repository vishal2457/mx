import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { MxActionComponent } from '../components/base-table/action';

@Injectable()
export class ActionService {
  private _actions = new BehaviorSubject<QueryList<MxActionComponent> | null>(
    null
  );

  actions$ = this._actions.asObservable().pipe(shareReplay());
  hasActions$ = this.actions$.pipe(
    map((data) => !!data?.length),
    shareReplay()
  );

  updateActions(actions: QueryList<MxActionComponent>) {
    this._actions.next(actions);
  }
}
