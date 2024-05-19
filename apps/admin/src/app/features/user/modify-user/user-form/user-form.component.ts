import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Z_user } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  showErrors = false;
  Z_user = Z_user;

  private fb = inject(FormBuilder);

  userForm = this.fb.nonNullable.group<ControlsOf<any>>({
    id: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    name: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    email: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    password: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    active: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    createdAt: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    udpatedAt: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.userForm.controls;
  }
}
