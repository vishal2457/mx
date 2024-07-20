import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TEMPLATE_TARGET,
  TExercise,
  TWorkoutTemplate,
  WORKOUT_INTENSITY,
  Z_workoutTemplate,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { Dialog } from '@angular/cdk/dialog';
import { SubSink } from '../../../../shared/utils/sub-sink';
import { AddWorkoutDetailComponent } from '../components/add-workout-details-dialog.component';
import { map, of } from 'rxjs';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'workoutTemplate-form',
  templateUrl: './workout-template-form.component.html',
})
export class WorkoutTemplateFormComponent {
  Z_workoutTemplate = Z_workoutTemplate;

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private api = inject(ApiService);

  targetEnums = Array.from(TEMPLATE_TARGET);
  intensityEnums = Array.from(WORKOUT_INTENSITY);
  workoutDetailData: any[] = [];
  exercises: TExercise[] = [];

  private subs = new SubSink();

  workoutTemplateForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TWorkoutTemplate, 'id'>>
  >({
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    target: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    intensity: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    approxCalorieBurn: new FormControl(null, {
      validators: [Validators.min(0)],
      nonNullable: true,
    }),
    approxTimeToCompleteInM: new FormControl(null, {
      validators: [Validators.min(0)],
      nonNullable: true,
    }),
    active: new FormControl(true, {
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.workoutTemplateForm.controls;
  }

  isInValid() {
    return this.workoutTemplateForm.invalid;
  }

  getFormValue() {
    return this.workoutTemplateForm.value;
  }

  reset() {
    this.workoutTemplateForm.reset();
  }
  patchValue(value) {
    this.workoutTemplateForm.patchValue(value);
  }

  openAddWorkoutDetail(e?: any, editMode = false) {
    this.fetchExercise().subscribe((exerciseData) => {
      const ref = this.dialog.open(AddWorkoutDetailComponent, {
        data: {
          editMode,
          formValues: e?.cellData,
          exerciseData,
        },
      });

      this.subs.sink = ref.closed.subscribe((result: any) => {
        if (!result) {
          return;
        }
        if (result.editMode) {
          const arr = this.workoutDetailData;
          const ix = arr.findIndex(
            (item) => item.exerciseID === result.formValues.exerciseID,
          );
          arr[ix] = {
            ...result.formValues,
            exerciseName: this.exercises.find(
              (i) => i.id === result.formValues.exerciseID,
            )?.name,
          };
          this.workoutDetailData = [...arr];
        } else {
          this.workoutDetailData = [
            ...this.workoutDetailData,
            {
              ...result.formValues,
              exerciseName: this.exercises.find(
                (i) => i.id === result.formValues.exerciseID,
              )?.name,
            },
          ];
        }
      });
    });
  }

  private fetchExercise() {
    const existingIDs = this.workoutDetailData.map((i) => i.exerciseID);
    if (this.exercises.length) {
      return of(this.exercises.filter((i) => !existingIDs.includes(i.id)));
    }
    return this.api
      .get<TExercise[]>('/exercise/all')
      .pipe(map((data) => (this.exercises = data.data)));
  }
}
