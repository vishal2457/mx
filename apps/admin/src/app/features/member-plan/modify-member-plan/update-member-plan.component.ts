import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MemberPlanFormComponent } from './member-plan-form/member-plan-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TMemberPlan } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-memberPlan',
  template: ` <page-header header="Edit MemberPlan">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <memberPlan-form />`,
})
export class UpdateMemberPlanComponent implements OnInit, OnDestroy {
  @ViewChild(MemberPlanFormComponent) memberPlanFormComponent!: MemberPlanFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  memberPlanID!: string;
  private requests = new SubSink()

  ngOnInit(): void {
    this.memberPlanID = this.route.snapshot.params['id'];
    this.fetchMemberPlanDetails( this.memberPlanID)
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchMemberPlanDetails(id: string) {
    this.api.get<TMemberPlan>(`/memberPlan/detail/${id}`).subscribe(({ data }) => {
       this.memberPlanFormComponent.patchValue(data);
    });
  }

    handleSubmit() {
    if (this.memberPlanFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating MemberPlan',
      id: 'update-memberPlan',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/memberPlan/update/${this.memberPlanID}`, this.memberPlanFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'MemberPlan updated',
            id: 'update-memberPlan',
            type: 'success',
          });
          this.router.navigate(['/memberPlan/list']);
        },
      });
  }

}
