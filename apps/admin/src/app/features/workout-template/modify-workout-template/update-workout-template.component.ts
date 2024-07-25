import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TWorkoutTemplate,
  TWorkoutTemplateDetail,
} from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { WorkoutTemplateFormComponent } from './workout-template-form/workout-template-form.component';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'edit-workoutTemplate',
  template: ` <page-header header="Edit Workout Template">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <workoutTemplate-form />`,
})
export class UpdateWorkoutTemplateComponent implements OnInit, OnDestroy {
  @ViewChild(WorkoutTemplateFormComponent)
  workoutTemplateFormComponent!: WorkoutTemplateFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(Dialog);

  workoutTemplateID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.workoutTemplateID = this.route.snapshot.params['id'];
    this.fetchWorkoutTemplateDetails(this.workoutTemplateID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchWorkoutTemplateDetails(id: string) {
    this.api
      .get<
        TWorkoutTemplate & {
          workoutTemplateDetail: Array<
            TWorkoutTemplateDetail & {
              exerciseName: string;
            }
          >;
        }
      >(`/workout-template/detail/${id}`)
      .subscribe(({ data }) => {
        this.workoutTemplateFormComponent.patchValue(data);
        this.workoutTemplateFormComponent.setWorkoutDetailData(
          data.workoutTemplateDetail,
        );
      });
  }

  handleSubmit() {
    if (this.workoutTemplateFormComponent.isInValid()) {
      return;
    }

    const workoutDetails =
      this.workoutTemplateFormComponent.getWorkoutDetailData();

    if (!workoutDetails.length) {
      this.dialog.open(ConfirmModalComponent, {
        data: {
          hideCancel: true,
          title: 'Error saving workout template',
          description: 'Add atleast one exercise routine in workout detail',
        },
      });
      return;
    }

    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating WorkoutTemplate',
      id: 'update-workoutTemplate',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/workout-template/update/${this.workoutTemplateID}`, {
        ...this.workoutTemplateFormComponent.getFormValue(),
        workoutDetails,
      })
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'WorkoutTemplate updated',
            id: 'update-workoutTemplate',
            type: 'success',
          });
          this.router.navigate(['/workoutTemplate/list']);
        },
      });
  }
}
