import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  TOrganisation,
  Z_organisation,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

type TOrganisationForm = Omit<TOrganisation, 'id' | 'createdAt' | 'updatedAt'>;

@Component({
  selector: 'organisation-form',
  templateUrl: './organisation-form.component.html',
})
export class OrganisationFormComponent {
  Z_organisation = Z_organisation;

  private fb = inject(FormBuilder);

  organisationForm = this.fb.nonNullable.group<ControlsOf<TOrganisationForm>>({
    name: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    email: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    emailVerified: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    active: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    mobile: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
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
}
