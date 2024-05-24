import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { MxActionComponent } from '../ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxDataGridModule } from '../ui/mx-data-grid/data-grid.module';
import { MxFilterPillsComponent } from './filters/components/filter-pills';
import { MxGridFilterComponent } from './filters/components/grid-filter';
import { FilterService } from './filters/filter.service';
import { FilterData } from './filters/types';
import { safeStringify } from '../utils/safe-json';
import { SubSink } from '../utils/sub-sink';

@Component({
  selector: 'mx-grid-shell',
  standalone: true,
  imports: [
    MxDataGridModule,
    CommonModule,
    GridColumnsComponent,
    MxActionComponent,
    MxGridToolbarComponent,
    MxFilterPillsComponent,
  ],
  template: `<mx-data-grid
    [data]="data"
    [loading]="loading"
    [collectionSize]="collectionSize"
    [gridTitle]="gridTitle"
    (sortChange)="handleSort($event)"
  >
    @for (tool of toolbar; track tool.name) {
    <mx-toolbar
      [icon]="tool.icon"
      [name]="tool.name"
      (handleClick)="tool.handleClick.emit($event)"
    />
    } @if (filters?.length) {
    <mx-toolbar icon="filter_alt" name="Filter" (handleClick)="openFilters()" />
    <!-- TODO : add a way to reset all grid options. -->
    <mx-toolbar
      icon="restart_alt"
      name="Reset grid"
      (handleClick)="filterService.clearFilterData()"
    />
    }
    <!-- Toolbar -->

    <!-- Action -->
    @for (action of actions; track action.icon) {
    <mx-action
      [icon]="action.icon"
      [tooltip]="action.tooltip"
      (handleClick)="action.handleClick && action.handleClick.emit($event)"
      [action]="action._action"
    />
    }
    <!-- Action -->

    <!-- Columns -->
    @for (column of columns; track column.field) {
    <mx-column
      [title]="column.title"
      [field]="column.field"
      [sortable]="column.sortable"
      [visible]="column.visible"
      [alignment]="column.alignment"
      [innerHtml]="column.innerHtml"
    >
      @if (column.head) {
      <ng-container>
        <ng-template #head let-item>
          <ng-container
            *ngTemplateOutlet="column.head; context: { $implicit: item }"
          ></ng-container>
        </ng-template>
      </ng-container>
      } @if (column.cell) {
      <ng-container>
        <ng-template #cell let-item>
          <ng-container
            *ngTemplateOutlet="
              column.cell;
              context: { $implicit: item, column }
            "
          ></ng-container>
        </ng-template>
      </ng-container>
      }
    </mx-column>
    }
    <!-- Columns -->

    <mx-filter-pills toolbarFooter />
  </mx-data-grid>`,
})
export class MxGridShellComponent implements OnDestroy, OnInit {
  overlay = inject(Overlay);
  filterService = inject(FilterService);
  api = inject(ApiService);

  @Input() apiURL = '';
  @Input() gridTitle = '';
  @Input() loadOnMount = true;

  @Output() protected actionEvents = new EventEmitter<any>();

  @ContentChildren(GridColumnsComponent)
  protected columns!: QueryList<GridColumnsComponent>;

  @ContentChildren(MxActionComponent) actions?: QueryList<MxActionComponent>;

  @ContentChildren(MxGridToolbarComponent)
  toolbar?: QueryList<MxGridToolbarComponent>;

  @ContentChildren(MxGridFilterComponent)
  filters?: QueryList<MxGridFilterComponent>;

  filterValues: FilterData[] = [];

  protected loading = false;
  protected collectionSize!: number;
  protected data: any[] = [];
  private subs = new SubSink();
  private requests = new SubSink();
  private gridEvents = { limit: 20, sort: null, page: 1 };
  private allowApiCall = ['limit', 'page', 'sort'];

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.requests.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.filterService.filterData$.subscribe((filterData) => {
      this.filterValues = filterData;
      this._getData();
    });
    this._getData();
  }

  captureGridEvents(events: { key: string; value: any }) {
    this.gridEvents = { ...this.gridEvents, [events.key]: events.value };
    if (this.allowApiCall.includes(events.key) && events.value) {
      this._getData();
    }
  }

  handleSort(sort: any) {
    this.gridEvents = { ...this.gridEvents, sort };
    this._getData();
  }

  openFilters() {
    if (!this.filters) {
      return;
    }
    this.filterService.updateFilters(this.filters);
    this.filterService.openFilterPanel();
  }

  private _getData() {
    if (!this.apiURL) {
      return console.error('Please provide a api url');
    }
    this.requests.unsubscribe();
    this.loading = true;
    this.requests.sink = this.api
      .getList<any>(this.apiURL, this.buildFilters())
      .subscribe({
        next: ({ data }) => {
          this.loading = false;
          this.collectionSize = data.count;
          this.data = data.rows;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  private buildFilters() {
    const { page, limit, sort } = this.gridEvents;
    return {
      page,
      limit,
      sort: safeStringify(sort || {}),
      filters: safeStringify(this.filterValues),
      fields: '',
    };
  }
}
