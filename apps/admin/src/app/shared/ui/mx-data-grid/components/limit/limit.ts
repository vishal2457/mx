import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_ROWS } from '../../types';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'mx-grid-limit',
  template: `
    <mx-btn-group-container>
      <mx-btn-group
        *ngFor="let limit of limits"
        [active]="(paginationService.selectedLimit$ | async) === limit"
        [text]="limit.toString()"
        (handleClick)="paginationService.updateSelectedLimit(limit)"
      />
    </mx-btn-group-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLimitComponent {
  constructor(public paginationService: PaginationService) {}
  limits = DEFAULT_ROWS;
}
