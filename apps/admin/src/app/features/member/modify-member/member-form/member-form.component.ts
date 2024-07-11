import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TMember, Z_member } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { patchableDate } from '../../../../shared/utils/patchable-date';

type TMemberForm = Omit<
  TMember,
  'id' | 'createdAt' | 'updatedAt' | 'joinDate' | 'organisationID'
> & { joinDate: string };

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
})
export class MemberFormComponent {
  Z_member = Z_member;

  private fb = inject(FormBuilder);

  memberForm = this.fb.nonNullable.group<ControlsOf<TMemberForm>>({
    planID: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    dob: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    address: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    mobile: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    height: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    weight: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    emergencyContact: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    gender: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userID: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    joinDate: new FormControl(patchableDate(), {
      validators: [],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.memberForm.controls;
  }

  isInValid() {
    return this.memberForm.invalid;
  }

  getFormValue() {
    return this.memberForm.value;
  }

  reset() {
    this.memberForm.reset();
  }

  patchValue(value) {
    this.memberForm.patchValue(value);
  }
}
