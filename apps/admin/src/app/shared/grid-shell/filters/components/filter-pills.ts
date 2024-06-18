import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FilterService } from '../filter.service';
import { MxBadgeComponent } from '../../../ui/badge';

@Component({
  selector: 'mx-filter-pills',
  standalone: true,
  imports: [MxBadgeComponent, NgFor, NgIf, AsyncPipe],
  template: `
    @if (filterService.filterData$ | async; as filterData) {
    <div class="flex gap-2 mb-2">
      @for (filter of filterData; track filter.field) {
      <div
        class="flex border-dashed border-[1.3px] p-1 rounded-md items-center justify-center"
      >
        <mx-badge
          [text]="
            filter.field +
            ' ' +
            filter.condition +
            ' ' +
            filter.value.toString()
          "
          class="rounded-md capitalize"
          variant="info"
        />
        <!-- <div
          data-orientation="vertical"
          role="none"
          class="shrink-0 bg-border w-[1px] mx-2 h-4"
        ></div>

        <mx-badge [text]="filter.condition" class="rounded-md" variant="info" />
        <div
          data-orientation="vertical"
          role="none"
          class="shrink-0 bg-border w-[1px] mx-2 h-4"
        ></div>
        <mx-badge
          [text]="filter.value.toString()"
          class="rounded-md"
          variant="info"
        /> -->
      </div>
      }
    </div>
    }
  `,
})
export class MxFilterPillsComponent {
  filterService = inject(FilterService);
}
