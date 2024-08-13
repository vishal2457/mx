import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  GOAL,
  STATUS_ENUM,
  TEnquiry,
  Z_enquiry,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'enquiry-form',
  templateUrl: './enquiry-form.component.html',
})
export class EnquiryFormComponent {
  Z_enquiry = Z_enquiry;

  private fb = inject(FormBuilder);
  goalEnum = Array.from(GOAL);
  statusEnum = Array.from(STATUS_ENUM);
  oldStatusValue!: string;

  enquiryForm = this.fb.nonNullable.group<
    ControlsOf<
      Omit<
        TEnquiry,
        'id' | 'createdAt' | 'updatedAt' | 'userID' | 'organisationID'
      >
    >
  >({
    customerName: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    mobile: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ],
      nonNullable: true,
    }),
    email: new FormControl('', Validators.email),
    goal: new FormControl(this.goalEnum[0], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl(this.statusEnum[0], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    periodInM: new FormControl(6, {
      validators: [Validators.required, Validators.max(36), Validators.min(1)],
      nonNullable: true,
    }),
    terms: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.enquiryForm.controls;
  }

  isInValid() {
    return this.enquiryForm.invalid;
  }

  getFormValue() {
    return { ...this.enquiryForm.value, oldStatusValue: this.oldStatusValue };
  }

  reset() {
    this.enquiryForm.reset();
  }

  patchValue(value: TEnquiry) {
    this.oldStatusValue = value.status;
    this.enquiryForm.patchValue(value);
  }

  markAllAsTouched() {
    this.enquiryForm.markAllAsTouched();
  }
}
