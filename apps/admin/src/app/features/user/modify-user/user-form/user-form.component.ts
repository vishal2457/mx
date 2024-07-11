import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TUser, Z_user } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { validateForm } from '../../../../shared/utils/validate-form';

type UserForm = Omit<
  TUser,
  'id' | 'createdAt' | 'updatedAt' | 'organisationID'
> & {
  roles: any[] | null;
};

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  showErrors = false;
  Z_user = Z_user;

  private fb = inject(FormBuilder);

  protected userForm = this.fb.nonNullable.group<ControlsOf<UserForm>>({
    name: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
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
    roles: new FormControl([], {
      validators: [Validators.required],
    }),
  });

  get formControls() {
    return this.userForm.controls;
  }

  getFormValue() {
    return this.userForm.getRawValue();
  }

  isInvalid() {
    return this.userForm.invalid;
  }

  validate() {
    validateForm(this.userForm.controls);
  }

  reset() {
    this.userForm.reset();
  }

  patchValue(values) {
    this.userForm.patchValue(values);
  }
}
