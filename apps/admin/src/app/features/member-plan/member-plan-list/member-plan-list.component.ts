import { Component, ViewChild } from '@angular/core';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';

@Component({
  selector: 'mx-match-list',
  template: ` <page-header header="Member Plans" [showCancel]="false">
    </page-header>
    <mx-grid-shell
      gridTitle="Member Plan List"
      apiURL="/member/member-plan/list"
    >
      <!-- columns -->
      <mx-column field="id" alignment="left" [visible]="false" />
      <mx-column field="member.name" title="Member" />
      <mx-column field="memberPlan.planName" title="Plan" />
      <mx-column field="memberPlan.amount" title="Amount" />
      <mx-column field="memberPlan.periodInMonths" title="Period (Months)" />
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
      <!-- columns -->
    </mx-grid-shell>`,
})
export class MemberPlanListComponent {
  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;
}
