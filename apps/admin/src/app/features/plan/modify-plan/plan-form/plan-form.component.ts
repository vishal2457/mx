import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TPlan, Z_plan } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'plan-form',
  templateUrl: './plan-form.component.html',
})
export class PlanFormComponent {
  Z_plan = Z_plan;

  private fb = inject(FormBuilder);

  planForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TPlan, 'id' | 'createdAt' | 'updatedAt'>>
  >({
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    amount: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    periodInMonths: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.planForm.controls;
  }

  isInValid() {
    return this.planForm.invalid;
  }

  getFormValue() {
    return this.planForm.value;
  }

  reset() {
    this.planForm.reset();
  }

  patchValue(value) {
    this.planForm.patchValue(value);
  }

  markAllAsTouched() {
    this.planForm.markAllAsTouched();
  }
}
