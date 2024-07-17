import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TMember } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MemberFormComponent } from './member-form/member-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { AddMembershipDialogComponent } from './components/add-membership.component';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';

@Component({
  selector: 'edit-member',
  template: `
    <page-header [header]="'Member details' + ' #' + memberID">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <member-form formType="update" [memberPlan]="memberPlan" />

    <div class="my-4"></div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
      <stats-card title="Total Spent" [amount]="totalSpent" />
      <stats-card title="Attendance This Month" value="30%" />
      <stats-card title="Membership expiring on" value="23 Aug 2020" />
    </div>
    @if (memberData?.id) {
      <div class="my-4"></div>
      <mx-grid-shell
        [apiURL]="'/member/membership-detail-list/' + memberData?.id"
        gridTitle="Plan History"
        maxHeight="200"
        minHeight="200"
      >
        <mx-toolbar
          name="Add Membership"
          icon="add"
          (handleClick)="openAddNewMemberShip()"
        />

        <mx-column field="plan.name" title="Plan" />
        <mx-column field="plan.amount" title="Amount" />
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
              [text]="item.memberPlan.paid ? 'Yes' : 'No'"
              [variant]="item.memberPlan.paid ? 'success' : 'error'"
              [clearable]="false"
            />
          </ng-template>
        </mx-column>
      </mx-grid-shell>
    }
  `,
})
export class UpdateMemberComponent implements OnInit, OnDestroy {
  @ViewChild(MemberFormComponent) memberFormComponent!: MemberFormComponent;
  @ViewChild(MxGridShellComponent, { static: false })
  gridShell!: MxGridShellComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(Dialog);

  memberID!: string;
  memberPlan: any[] = [];
  memberData: TMember | undefined;
  totalSpent!: number;
  private requests = new SubSink();
  private subs = new SubSink();

  ngOnInit(): void {
    this.memberID = this.route.snapshot.params['id'];
    this.fetchMemberDetails(this.memberID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
    this.subs.unsubscribe();
  }

  private fetchMemberDetails(id: string) {
    this.api
      .get<{
        details: TMember & { memberPlan: any[] };
        memberTotalSpent: { amount: string };
      }>(`/member/${id}`)
      .subscribe(({ data }) => {
        const { memberPlan, ...rest } = data.details;
        this.memberData = rest;
        this.memberFormComponent.patchValue(rest);
        this.memberPlan = memberPlan;
        this.totalSpent = parseFloat(data.memberTotalSpent.amount);
      });
  }

  handleSubmit() {
    if (this.memberFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Member',
      id: 'update-member',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/member/update/${this.memberID}`,
        this.memberFormComponent.getFormValue(),
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Member updated',
            id: 'update-member',
            type: 'success',
          });
          this.router.navigate(['/member/list']);
        },
      });
  }

  openAddNewMemberShip() {
    const ref = this.dialog.open(AddMembershipDialogComponent, {
      data: {
        memberID: this.memberData?.id,
        email: this.memberData?.email,
      },
    });

    this.subs.sink = ref.closed.subscribe((result: any) => {
      if (result.refresh) {
        this.gridShell.refresh();
      }
    });
  }
}
