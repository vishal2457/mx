import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'enquiry-list',
  template: ` <page-header header="Enquiry" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Enquiry</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Enquirys" apiURL="/enquiry/list">
      <!-- columns -->
      <mx-column field="id" />
      <mx-column field="customerName" title="Customer Name" />
      <mx-column field="mobile" />
      <mx-column field="email" />
      <mx-column field="goal" />
      <mx-column field="status">
        <ng-template #cell let-item>
          <mx-badge
            [text]="item.status"
            [variant]="item.status === 'Open' ? 'info' : 'secondary'"
          />
        </ng-template>
      </mx-column>
      <mx-column field="createdAt">
        <ng-template #cell let-item>
          {{ item.createdAt | date: 'medium' }}
        </ng-template>
      </mx-column>
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="CustomerName" field="customerName" />
      <mx-grid-filter label="Mobile" field="mobile" />
      <mx-grid-filter label="Email" field="email" />
      <mx-grid-filter label="Goal" field="goal" />
      <mx-grid-filter label="Status" field="status" />
      <mx-grid-filter label="UserId" field="userID" />
      <mx-grid-filter label="Terms" field="terms" />
      <mx-grid-filter label="CreatedAt" field="createdAt" />
      <mx-grid-filter label="UpdatedAt" field="updatedAt" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class EnquiryListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/enquiry/create']);
  }

  edit(e: any) {
    this.router.navigate(['/enquiry/update/' + e.cellData.id]);
  }
}
