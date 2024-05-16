import { Component } from "@angular/core";
import { PaginationService } from "../../services/pagination.service";

@Component({
  selector: "table-footer",
  template: `<div class="rounded-0 py-3 flex justify-between">
    <ng-container>
      <div class="flex">
        <mx-grid-limit />
        <div class="flex items-center pl-4">
          Rows:
          <span class="font-bold pl-2">{{
            (pagination.collectionSize$ | async) || 0
          }}</span>
        </div>
      </div>

      <gb-pagination
        [collectionSize]="(pagination.collectionSize$ | async) || 0"
        [pageSize]="(pagination.selectedLimit$ | async) || 20"
        [page]="(pagination.page$ | async) || 1"
        [maxSize]="7"
        [boundaryLinks]="true"
        [rotate]="true"
        (pageChange)="pagination.updatePage($event)"
        class="ml-auto flex"
      />
    </ng-container>
  </div> `,
})
export class TableFooterComponent {
  constructor(public pagination: PaginationService) {}
}
