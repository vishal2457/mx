import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
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

  enquiryForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TEnquiry, 'id' | 'createdAt' | 'updatedAt'>>
  >({
    customerName: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    mobile: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    goal: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userID: new FormControl(null, {
      validators: [Validators.required],
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
    return this.enquiryForm.value;
  }

  reset() {
    this.enquiryForm.reset();
  }

  patchValue(value) {
    this.enquiryForm.patchValue(value);
  }
}
