import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  EXERCISE_LEVEL,
  TExercise,
  Z_exercise,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { Dialog } from '@angular/cdk/dialog';
import { AddBodyPartComponent } from '../components/add-body-part.component';
import { SubSink } from '../../../../shared/utils/sub-sink';

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html',
})
export class ExerciseFormComponent implements OnDestroy {
  Z_exercise = Z_exercise;

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);

  private subs = new SubSink();

  exerciseLevel = Array.from(EXERCISE_LEVEL);

  exerciseForm = this.fb.nonNullable.group<
    ControlsOf<
      Omit<TExercise, 'id' | 'organisationID'> & { bodyPartID: number | null[] }
    >
  >({
    bodyPartID: new FormControl([], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    mechanic: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    equipment: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    category: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    force: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    level: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    referenceURL: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
  });

  ngOnDestroy(): void {
    this.subs;
  }

  get formControls() {
    return this.exerciseForm.controls;
  }

  isInValid() {
    return this.exerciseForm.invalid;
  }

  getFormValue() {
    return this.exerciseForm.value;
  }

  reset() {
    this.exerciseForm.reset();
  }

  patchValue(value) {
    this.exerciseForm.patchValue(value);
  }

  openAddBodyPart() {
    const ref = this.dialog.open(AddBodyPartComponent);

    this.subs.sink = ref.closed.subscribe((result: any) => {
      if (result.refresh) {
        // this.gridShell.refresh();
      }
    });
  }

  markAllAsTouched() {
    this.exerciseForm.markAllAsTouched();
  }
}
