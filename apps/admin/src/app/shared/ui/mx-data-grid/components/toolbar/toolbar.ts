import { Component, ContentChild, TemplateRef } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';
import { MetaDataService } from '../../services/meta-data.service';
import { combineLatest, map, of } from 'rxjs';

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
      <p class="font-bold text-3xl pb-4">{{ meta.gridTitle$ | async }}</p>
      <mx-btn-group-container>
        @for (tool of toolbarService.options$ | async; track tool.name) {
        <mx-btn-group
          (handleClick)="tool.handleClick.emit(tool)"
          [icon]="tool.icon"
          [text]="tool.name || ''"
        />
        }
      </mx-btn-group-container>
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

  @ContentChild('toolbarFooter') toolbarFooter!: TemplateRef<any>;

  renderToolbar$ = of(false);
}
