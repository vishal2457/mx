import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TOrganisation,
  Z_organisation,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

type TOrganisationForm = Omit<
  TOrganisation,
  'id' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'active'
>;

@Component({
  selector: 'organisation-form',
  templateUrl: './organisation-form.component.html',
})
export class OrganisationFormComponent {
  Z_organisation = Z_organisation;

  private fb = inject(FormBuilder);

  organisationForm = this.fb.nonNullable.group<ControlsOf<TOrganisationForm>>({
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    mobile: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      nonNullable: true,
    }),
    logo: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    panelName: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    darkMode: new FormControl(true, {
      validators: [],
      nonNullable: true,
    }),
    theme: new FormControl('default'),
  });

  get formControls() {
    return this.organisationForm.controls;
  }

  isInValid() {
    return this.organisationForm.invalid;
  }

  getFormValue() {
    return this.organisationForm.value;
  }

  reset() {
    this.organisationForm.reset();
  }

  patchValue(value) {
    this.organisationForm.patchValue(value);
  }

  handleLogoChange(file: any) {
    this.organisationForm.patchValue({ logo: file });
  }
}
