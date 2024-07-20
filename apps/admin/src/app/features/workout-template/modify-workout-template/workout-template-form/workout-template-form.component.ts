import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TEMPLATE_TARGET,
  TWorkoutTemplate,
  WORKOUT_INTENSITY,
  Z_workoutTemplate,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'workoutTemplate-form',
  templateUrl: './workout-template-form.component.html',
})
export class WorkoutTemplateFormComponent {
  Z_workoutTemplate = Z_workoutTemplate;

  private fb = inject(FormBuilder);

  targetEnums = Array.from(TEMPLATE_TARGET);
  intensityEnums = Array.from(WORKOUT_INTENSITY);

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
}
