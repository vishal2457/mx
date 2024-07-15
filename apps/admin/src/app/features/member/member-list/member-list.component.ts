import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'member-list',
  template: ` <page-header header="Member" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Member</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Members" apiURL="/member/list">
      <!-- columns -->
      <mx-column field="member.name" title="Name" />
      <mx-column field="plan.name" title="Plan" />
      <mx-column field="member.age" title="Age" />
      <mx-column field="member.mobile" title="mobile" />
      <mx-column field="member.email" title="email" />
      <mx-column field="member.height" title="height" />
      <mx-column field="member.weight" title="weight" />
      <mx-column field="member.emergencyContact" title="Emergency Contact" />
      <mx-column field="member.gender" title="Gender" />
      <mx-column field="member.userID" title="Assigned User" />
      <mx-column field="member.joinDate" title="Join Date" />
      <!-- columns -->

      <!-- filters -->
      <!-- <mx-grid-filter label="PlanId" field="planID" />
      <mx-grid-filter label="Name" field="name" />
      <mx-grid-filter label="Dob" field="dob" />
      <mx-grid-filter label="Address" field="address" />
      <mx-grid-filter label="Mobile" field="mobile" />
      <mx-grid-filter label="Email" field="email" />
      <mx-grid-filter label="Height" field="height" />
      <mx-grid-filter label="Weight" field="weight" />
      <mx-grid-filter label="Emergency Contact" field="emergencyContact" />
      <mx-grid-filter label="Gender" field="gender" />
      <mx-grid-filter label="Assigned User" field="userID" />
      <mx-grid-filter label="Join Date" field="joinDate" /> -->
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class MemberListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/member/create']);
  }

  edit(e: any) {
    this.router.navigate(['/member/update/' + e.cellData.member.id]);
  }
}
