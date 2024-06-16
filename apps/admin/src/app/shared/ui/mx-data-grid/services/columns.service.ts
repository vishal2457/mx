import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Subject, map, shareReplay } from 'rxjs';
import { GridColumnsComponent } from '../components/base-table/columns';

@Injectable()
export class GridColumnService {
  private _columns =
    new BehaviorSubject<QueryList<GridColumnsComponent> | null>(null);
  private sort = new Subject<Partial<{
    Asc: string;
    Desc: string;
  }> | null>();

  columns$ = this._columns.asObservable().pipe(shareReplay());
  fields$ = this.columns$.pipe(
    map((columns) => columns?.map((item) => item.field))
  );
  totalColumns$ = this.columns$.pipe(map((columns) => columns?.length));
  sort$ = this.sort.asObservable();

  updateColumns(columns: QueryList<GridColumnsComponent>) {
    this._columns.next(columns);
  }

  moveRight(index: number, columns: QueryList<GridColumnsComponent>) {
    const rawColumns = columns.toArray();

    if (index === rawColumns.length - 1) {
      return;
    }
    const actions = rawColumns.pop();
    [rawColumns[index], rawColumns[index + 1]] = [
      rawColumns[index + 1],
      rawColumns[index],
    ];
    if (actions) {
      rawColumns.push(actions);
    }
    columns.reset(rawColumns);
    this._columns.next(columns);
  }

  moveLeft(index: number, columns: QueryList<GridColumnsComponent>) {
    const rawColumns = columns.toArray();
    if (index === 0) {
      return;
    }
    const actions = rawColumns.pop();

    [rawColumns[index], rawColumns[index - 1]] = [
      rawColumns[index - 1],
      rawColumns[index],
    ];
    if (actions) {
      rawColumns.push(actions);
    }
    columns.reset(rawColumns);
    this._columns.next(columns);
  }

  sortAsc(field: string) {
    this.sort.next({ Asc: field });
  }

  sortDesc(field: string) {
    this.sort.next({ Desc: field });
  }

  unsort() {
    this.sort.next(null);
  }

  sortIcon$(field: string) {
    return this.sort$.pipe(
      map((value) => {
        if (value?.Asc === field) {
          return 'arrow_upward';
        }
        if (value?.Desc === field) {
          return 'arrow_downward';
        }
        return 'unfold_more';
      })
    );
  }
}
