import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'plan-list',
  template: ` <page-header header="Plan" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Plan</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Plans" apiURL="/plan/list">
      <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="name" alignment="left" />
      <mx-column field="amount" alignment="left" />
      <mx-column
        field="periodInMonths"
        title="Period In Months"
        alignment="left"
      />
      <mx-column field="createdAt" title="Created At" alignment="left">
        <ng-template #cell let-item>
          {{ item.createdAt | date: 'medium' }}
        </ng-template>
      </mx-column>
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="Name" field="name" />
      <mx-grid-filter label="Amount" field="amount" />
      <mx-grid-filter label="PeriodInMonths" field="periodInMonths" />
      <mx-grid-filter label="CreatedAt" field="createdAt" />
      <mx-grid-filter label="UpdatedAt" field="updatedAt" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class PlanListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/plan/create']);
  }

  edit(e: any) {
    this.router.navigate(['/plan/update/' + e.cellData.id]);
  }
}
