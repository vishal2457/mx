import {
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-exercise',
  template: `<page-header header="Add Exercise">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <exercise-form />`,
})
export class CreateExerciseComponent implements OnDestroy {
  @ViewChild(ExerciseFormComponent) ExerciseFormComponent!: ExerciseFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.ExerciseFormComponent.isInValid()) {
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Exercise',
      id: 'add-exercise',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/exercise/create', this.ExerciseFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.ExerciseFormComponent.reset();
          this.notif.updateToast({
            text: 'Exercise added',
            id: 'add-exercise',
            type: 'success',
          });
        },
      });
  }
}
