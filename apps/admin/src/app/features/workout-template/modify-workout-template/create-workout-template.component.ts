import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { WorkoutTemplateFormComponent } from './workout-template-form/workout-template-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-workoutTemplate',
  template: `<page-header header="Add Workout Template">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <workoutTemplate-form />`,
})
export class CreateWorkoutTemplateComponent implements OnDestroy {
  @ViewChild(WorkoutTemplateFormComponent)
  WorkoutTemplateFormComponent!: WorkoutTemplateFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.WorkoutTemplateFormComponent.isInValid()) {
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
        workoutDetails: this.WorkoutTemplateFormComponent.workoutDetailData,
      })
      .subscribe({
        next: () => {
          this.WorkoutTemplateFormComponent.reset();
          this.notif.updateToast({
            text: 'WorkoutTemplate added',
            id: 'add-workoutTemplate',
            type: 'success',
          });
        },
      });
  }
}
