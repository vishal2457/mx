import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'member-plan-list',
  template: ` <page-header header="Member Plan" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add memberPlan</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell
      gridTitle="Member Plans List"
      apiURL="/member/member-plan/list"
    >
      <!-- columns -->
      <mx-column field="id" [visible]="false" />
      <mx-column field="member.name" title="Member" />
      <mx-column field="plan.name" title="Plan" />
      <mx-column field="memberPlan.startDate" title="Start Date">
        <ng-template #cell let-item>
          {{ item.memberPlan.startDate | date: 'mediumDate' }}
        </ng-template>
      </mx-column>
      <mx-column field="memberPlan.endDate" title="End Date">
        <ng-template #cell let-item>
          {{ item.memberPlan.endDate | date: 'mediumDate' }}
        </ng-template>
      </mx-column>
      <mx-column field="memberPlan.paid" title="Paid">
        <ng-template #cell let-item>
          <mx-badge
            [text]="item.memberPlan.paid"
            [variant]="item.memberPlan.paid ? 'success' : 'error'"
          />
        </ng-template>
      </mx-column>
      <mx-column field="memberPlan.createdAt" title="Created At">
        <ng-template #cell let-item>
          {{ item.memberPlan.createdAt | date: 'medium' }}
        </ng-template>
      </mx-column>
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="MemberId" field="memberID" />
      <mx-grid-filter label="PlanId" field="planID" />
      <mx-grid-filter label="StartDate" field="startDate" />
      <mx-grid-filter label="EndDate" field="endDate" />
      <mx-grid-filter label="Paid" field="paid" />
      <mx-grid-filter label="CreatedAt" field="createdAt" />
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
