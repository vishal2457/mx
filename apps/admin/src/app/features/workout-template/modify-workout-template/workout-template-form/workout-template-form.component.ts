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
    day6: any[];
    day7: any[];
  } = { day1: [], day2: [], day3: [], day4: [], day5: [], day6: [], day7: [] };
  workoutDetailDayNames: {
    day1: string;
    day2: string;
    day3: string;
    day4: string;
    day5: string;
    day6: string;
    day7: string;
  } = {
    day1: 'Chest',
    day2: 'Back',
    day3: 'Arms',
    day4: 'Shoulder',
    day5: 'Legs',
    day6: 'Cardio',
    day7: 'HIIT',
  };
  exercises: TExercise[] = [];

  private subs = new SubSink();

  workoutTemplateForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TWorkoutTemplate, 'id' | 'organisationID'>>
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
    this.fetchExercise().subscribe((exerciseData) => {
      for (const iterator of data) {
        const { day, dayName, ...rest } = iterator;
        this.workoutDetailData[day].push({
          ...rest,
          _meta: exerciseData.find((e) => e.id === rest.exerciseID),
        });
        this.workoutDetailDayNames[day] = dayName;
      }
    });

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
          dayName: this.workoutDetailDayNames[day],
          exerciseData,
        },
      });

      this.subs.sink = ref.closed.subscribe((result: any) => {
        if (!result) {
          return;
        }
        this.workoutDetailData[day] = result.formValues;
        this.workoutDetailDayNames[day] = result.dayName;
      });
    });
  }

  private fetchExercise() {
    if (this.exercises.length) {
      return of(this.exercises);
    }
    return this.api
      .get<TExercise[]>('/exercise/all')
      .pipe(map((data) => (this.exercises = data.data)));
  }

  getWorkoutDetailData() {
    let result: TWorkoutTemplateDetail[] = [];
    const requestData = JSON.parse(
      JSON.stringify({ ...this.workoutDetailData }),
    );
    for (const key in requestData) {
      const data = [...requestData[key]];
      const arr = data.map((i) => {
        delete i._meta;
        return {
          day: key as any,
          dayName: this.workoutDetailDayNames[key],
          ...i,
        };
      });
      result = [...result, ...arr];
    }
    return result;
  }
}
