import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-plan',
  template: `<page-header header="Add Plan">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <plan-form />`,
})
export class CreatePlanComponent implements OnDestroy {
  @ViewChild(PlanFormComponent) PlanFormComponent!: PlanFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.PlanFormComponent.isInValid()) {
      this.PlanFormComponent.markAllAsTouched();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Plan',
      id: 'add-plan',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/plan/create', this.PlanFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.PlanFormComponent.reset();
          this.notif.updateToast({
            text: 'Plan added',
            id: 'add-plan',
            type: 'success',
          });
        },
      });
  }
}
