import { Component } from '@angular/core';
import { GridDataService } from '../../../services/data.service';
import { GridColumnService } from '../../../services/columns.service';
import { STATIC_ACTION_HEADER, STATIC_SELECTABLE_HEADER } from '../../../types';
import { LoadingService } from '../../../services/loading.service';
import { ActionService } from '../../../services/actions.service';

@Component({
  selector: 'base-data-table',
  templateUrl: `./table.html`,
})
export class BaseDataTableComponent {
  constructor(
    public gridData: GridDataService,
    public columnService: GridColumnService,
    public loader: LoadingService,
    public actionService: ActionService
  ) {}

  isAction = STATIC_ACTION_HEADER['field'];
  isSelectable = STATIC_SELECTABLE_HEADER['field'];
}
