import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TEMPLATE_TARGET,
  TExercise,
  TWorkoutTemplate,
  TWorkoutTemplateDetail,
  WORKOUT_INTENSITY,
  Z_workoutTemplate,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { Dialog } from '@angular/cdk/dialog';
import { SubSink } from '../../../../shared/utils/sub-sink';
import { AddWorkoutDetailComponent } from '../components/add-workout-details-dialog.component';
import { map, of } from 'rxjs';
import { ApiService } from '../../../../shared/services/api.service';

type WorkoutDetailData = Array<
  TWorkoutTemplateDetail & {
    exerciseName: string;
  }
>;

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
  workoutDetailData: {
    day1: any[];
    day2: any[];
    day3: any[];
    day4: any[];
    day5: any[];
  } = { day1: [], day2: [], day3: [], day4: [], day5: [] };
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

  setWorkoutDetailData(data: WorkoutDetailData) {
    // this.workoutDetailData = data;
  }

  openAddWorkoutDetail(day: string, editMode = false) {
    this.fetchExercise().subscribe((exerciseData) => {
      const ref = this.dialog.open(AddWorkoutDetailComponent, {
        maxWidth: '500px',
        maxHeight: '500px',
        data: {
          editMode,
          formValues: this.workoutDetailData[day].map((i) => {
            return {
              ...i,
              _meta: this.exercises.find((e) => e.id === i.exerciseID),
            };
          }),
          exerciseData,
        },
      });

      this.subs.sink = ref.closed.subscribe((result: any) => {
        if (!result) {
          return;
        }
        this.workoutDetailData[day] = result.formValues;
      });
    });
  }

  private fetchExercise() {
    return this.api
      .get<TExercise[]>('/exercise/all')
      .pipe(map((data) => (this.exercises = data.data)));
  }

  private getExerciseName(exerciseID: number) {
    return this.exercises.find((i) => i.id === exerciseID)?.name;
  }
}
