import { Component, ContentChild, inject, TemplateRef } from '@angular/core';
import { combineLatest, map, of } from 'rxjs';
import { GridColumnService } from '../../services/columns.service';
import { MetaDataService } from '../../services/meta-data.service';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'toolbar',
  styleUrls: ['./toolbar.scss'],
  template: `
    <div
      *ngIf="renderToolbar$ | async"
      class="flex flex-row justify-between"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <p class="font-bold text-2xl pb-4">{{ meta.gridTitle$ | async }}</p>
      <div class="flex">
        <mx-btn-group-container>
          @for (tool of toolbarService.options$ | async; track tool.name) {
          <mx-btn-group
            (handleClick)="tool.handleClick.emit(tool)"
            [icon]="tool.icon"
            [text]="tool.name || ''"
          />
          }
        </mx-btn-group-container>
        <!-- <mx-dropdown
          [closeOnSelect]="false"
          spacing="compact"
          dropdownTitle="Show Columns"
        >
          <mx-btn-group
            trigger
            icon="view_column"
            text="Configure columns"
            btnClass="border-y"
          />
          @for (column of columnService.columns$ |async; track column.field ) {
          <mx-dropdown-item
            [checkbox]="true"
            [text]="column.title || column.field"
            [checkboxValue]="true"
          />
          } -->
        <mx-overlay class="ml-2">
          <mx-button trigger size="sm">Columns</mx-button>

          <p class="text-sm">Show Columns</p>
          <div class=" my-1 h-px border w-full"></div>
          @for (column of columnService.columns$ |async; track column.field; let
          index = $index ) {
          <span
            class="flex gap-2 cursor-pointer items-center"
            (click)="columnService.handleColumnVisibility(index)"
          >
            @if(column.visible) {
            <span
              class="size-2 inline-block rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2"
            ></span>
            } @else {
            <span
              class="size-2 inline-block rounded-full bg-red-800 dark:bg-red-500 ml-2"
            ></span>
            }
            {{ column.title || column.field }}
          </span>
          }
        </mx-overlay>
      </div>
    </div>
  `,
})
export class GridToolbarComponent {
  constructor(
    public toolbarService: ToolbarService,
    public meta: MetaDataService
  ) {
    this.renderToolbar$ = combineLatest([
      this.meta.gridTitle$,
      this.toolbarService.options$,
    ]).pipe(map(([title, options]) => !!title || !!options?.length));
  }

  protected columnService = inject(GridColumnService);

  @ContentChild('toolbarFooter') toolbarFooter!: TemplateRef<any>;

  renderToolbar$ = of(false);
}
