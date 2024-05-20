import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TTest, Z_test } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'test-form',
  templateUrl: './test-form.component.html',
})
export class TestFormComponent {
  showErrors = false;
  Z_test = Z_test;

  private fb = inject(FormBuilder);

  testForm = this.fb.nonNullable.group<ControlsOf<TTest>>({
    id: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    name: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.testForm.controls;
  }
}
