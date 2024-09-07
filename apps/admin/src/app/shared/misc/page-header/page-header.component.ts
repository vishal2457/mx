import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { MxButtonComponent } from '../../ui/button';
import { MxIconComponent } from '../../ui/icon';
import { MxBreadcrumbsComponent } from '../../ui/breadcrumbs';
import { MODULE_HEADERS } from '../../constants/module-headers';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [MxButtonComponent, MxIconComponent, MxBreadcrumbsComponent],
  template: `
    <div class="mb-3 flex justify-between items-center">
      <div class="item-center">
        @let info = moduleInfo();
        <h5 class="font-bold lg:text-3xl md:text-3xl pb-2">
          {{ info?.header || header }}
        </h5>
        <p class="pb-4 dark:text-gray-400 text-gray-700 text-sm">
          {{ info?.description }}
        </p>
        @if (showBreadcrumb) {
          <mx-breadcrumbs [data]="[]" />
        }
      </div>
      <div class="flex gap-3">
        <ng-content></ng-content>
        @if (showCancel) {
          <mx-button (handleClick)="handleCancel()">
            <span class="flex items-center">
              <p>Cancel</p>
            </span>
          </mx-button>
        }
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  constructor(private location: Location) {}

  @Input() showBreadcrumb = false;
  @Input() header = '';
  @Input() showCancel = true;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  module = input('');
  moduleInfo = computed(() => {
    return MODULE_HEADERS[this.module()];
  });

  handleCancel() {
    if (this.cancel.observed) {
      return this.cancel.emit();
    }
    this.location.back();
  }
}
