import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TExercise } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-exercise',
  template: ` <page-header header="Edit Exercise">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <exercise-form />`,
})
export class UpdateExerciseComponent implements OnInit, OnDestroy {
  @ViewChild(ExerciseFormComponent)
  exerciseFormComponent!: ExerciseFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  exerciseID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.exerciseID = this.route.snapshot.params['id'];
    this.fetchExerciseDetails(this.exerciseID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchExerciseDetails(id: string) {
    this.api.get<TExercise>(`/exercise/detail/${id}`).subscribe(({ data }) => {
      this.exerciseFormComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.exerciseFormComponent.isInValid()) {
      this.exerciseFormComponent.markAllAsTouched();
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Exercise',
      id: 'update-exercise',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/exercise/update/${this.exerciseID}`,
        this.exerciseFormComponent.getFormValue(),
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Exercise updated',
            id: 'update-exercise',
            type: 'success',
          });
          this.router.navigate(['/exercise/list']);
        },
      });
  }
}
