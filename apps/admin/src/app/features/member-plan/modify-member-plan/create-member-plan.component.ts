import {
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { MemberPlanFormComponent } from './member-plan-form/member-plan-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-memberPlan',
  template: `<page-header header="Add MemberPlan">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <memberPlan-form />`,
})
export class CreateMemberPlanComponent implements OnDestroy {
  @ViewChild(MemberPlanFormComponent) MemberPlanFormComponent!: MemberPlanFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.MemberPlanFormComponent.isInValid()) {
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding MemberPlan',
      id: 'add-memberPlan',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/memberPlan/create', this.MemberPlanFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.MemberPlanFormComponent.reset();
          this.notif.updateToast({
            text: 'MemberPlan added',
            id: 'add-memberPlan',
            type: 'success',
          });
        },
      });
  }
}
