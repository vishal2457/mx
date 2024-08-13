import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'member-plan-list',
  template: ` <page-header header="memberPlan" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add memberPlan</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="memberPlans" apiURL="/member-plan/list">
      <!-- columns -->
      <mx-column field="id" />
      <mx-column field="memberID" />
      <mx-column field="planID" />
      <mx-column field="startDate" />
      <mx-column field="endDate" />
      <mx-column field="paid" />
      <mx-column field="createdAt" />
      <mx-column field="updatedAt" />
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="MemberId" field="memberID" />
      <mx-grid-filter label="PlanId" field="planID" />
      <mx-grid-filter label="StartDate" field="startDate" />
      <mx-grid-filter label="EndDate" field="endDate" />
      <mx-grid-filter label="Paid" field="paid" />
      <mx-grid-filter label="CreatedAt" field="createdAt" />
      <mx-grid-filter label="UpdatedAt" field="updatedAt" />
      <!-- filters -->

      <!-- actions -->
      <!-- actions -->
    </mx-grid-shell>`,
})
export class MemberPlanListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/member-plan/create']);
  }

  edit(e: any) {
    this.router.navigate(['/member-plan/update/' + e.cellData.id]);
  }
}
