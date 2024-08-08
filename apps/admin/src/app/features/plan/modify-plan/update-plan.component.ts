import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TPlan } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-plan',
  template: ` <page-header header="Edit Plan">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <plan-form />`,
})
export class UpdatePlanComponent implements OnInit, OnDestroy {
  @ViewChild(PlanFormComponent) planFormComponent!: PlanFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  planID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.planID = this.route.snapshot.params['id'];
    this.fetchPlanDetails(this.planID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchPlanDetails(id: string) {
    this.api.get<TPlan>(`/plan/detail/${id}`).subscribe(({ data }) => {
      this.planFormComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.planFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Plan',
      id: 'update-plan',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/plan/update/${this.planID}`, this.planFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Plan updated',
            id: 'update-plan',
            type: 'success',
          });
          this.router.navigate(['/plan/list']);
        },
      });
  }
}
