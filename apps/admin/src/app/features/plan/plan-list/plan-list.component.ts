import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, ViewChild } from '@angular/core';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';
import { QuickAddPlanComponent } from '../../../shared/misc/quick-add-plan.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'plan-list',
  template: ` <page-header module="plan" [showCancel]="false">
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
      <mx-action
        icon="trash"
        (handleClick)="deletePlan($event)"
        text="Delete"
        variant="destructive"
      />
    </mx-grid-shell>`,
})
export class PlanListComponent {
  private dialog = inject(Dialog);
  private toast = inject(MxNotification);
  private api = inject(ApiService);
  @ViewChild(MxGridShellComponent, { static: false })
  gridShell!: MxGridShellComponent;

  private subs = new SubSink();

  create() {
    // this.router.navigate(['/plan/create']);
    const ref = this.dialog.open(QuickAddPlanComponent);
    this.subs.sink = ref.closed.subscribe((data: any) => {
      this.gridShell.refresh();
      this.subs.unsubscribe();
    });
  }

  edit(e: any) {
    // this.router.navigate(['/plan/update/' + e.cellData.id]);
    const ref = this.dialog.open(QuickAddPlanComponent, {
      data: {
        payload: e.cellData,
      },
    });
    this.subs.sink = ref.closed.subscribe((data: any) => {
      this.gridShell.refresh();
      this.subs.unsubscribe();
    });
  }

  deletePlan(e: any) {
    const ref = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      maxHeight: '500px',
      data: {
        title: `Are you sure you want to delete user ${e.cellData.email}?`,
        description: 'This action will not be reverted once done.',
      },
    });
    this.subs.sink = ref.closed.subscribe((result: any) => {
      if (!result.success) {
        return;
      }
      this.api.delete(`/plan/delete/${e.cellData.id}`).subscribe(() => {
        this.gridShell.refresh();
        this.toast.show({
          text: 'Plan Deleted',
          type: 'success',
        });
      });
    });
  }
}
