import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { WorkoutTemplateFormComponent } from './workout-template-form/workout-template-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';
import { UserService } from '../../../shared/services/user-data.service';
import { take } from 'rxjs';
import {
  PERMISSIONS,
  RESOURCES,
} from '../../../../../../../libs/mx-schema/src';
import { Router } from '@angular/router';

@Component({
  selector: 'add-workoutTemplate',
  template: `<page-header header="Add Workout Template">
      @if (canAdd) {
        <mx-button (handleClick)="handleSubmit()">
          <span class="flex items-center">
            <p>Save</p>
          </span>
        </mx-button>
      }
    </page-header>
    <workoutTemplate-form />`,
})
export class CreateWorkoutTemplateComponent implements OnDestroy, OnInit {
  @ViewChild(WorkoutTemplateFormComponent)
  WorkoutTemplateFormComponent!: WorkoutTemplateFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  private dialog = inject(Dialog);
  private user = inject(UserService);
  private router = inject(Router);

  private addRequests = new SubSink();

  canAdd = false;

  ngOnInit(): void {
    this.user.permissions$.pipe(take(2)).subscribe((data) => {
      const permissions = this.user.getPermission(RESOURCES.WORKOUT, data);
      this.canAdd = permissions.includes(PERMISSIONS.CREATE);
    });
  }

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.WorkoutTemplateFormComponent.isInValid()) {
      this.WorkoutTemplateFormComponent.markAllAsTouched();
      return;
    }

    const workoutDetails =
      this.WorkoutTemplateFormComponent.getWorkoutDetailData();

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
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding WorkoutTemplate',
      id: 'add-workoutTemplate',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/workout-template/create', {
        ...this.WorkoutTemplateFormComponent.getFormValue(),
        workoutDetails,
      })
      .subscribe({
        next: () => {
          this.WorkoutTemplateFormComponent.reset();
          this.notif.updateToast({
            text: 'WorkoutTemplate added',
            id: 'add-workoutTemplate',
            type: 'success',
          });
          this.router.navigate(['/workout-template/list']);
        },
      });
  }
}
