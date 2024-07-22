import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TSystemConfig,
  Z_systemConfig,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'systemConfig-form',
  templateUrl: './system-config-form.component.html',
})
export class SystemConfigFormComponent {
  Z_systemConfig = Z_systemConfig;

  private fb = inject(FormBuilder);

  systemConfigForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TSystemConfig, 'id' | 'organisationID'>>
  >({
    logo: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    panelName: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    darkMode: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    theme: new FormControl('default'),
  });

  get formControls() {
    return this.systemConfigForm.controls;
  }

  isInValid() {
    return this.systemConfigForm.invalid;
  }

  getFormValue() {
    return this.systemConfigForm.value;
  }

  reset() {
    this.systemConfigForm.reset();
  }

  patchValue(value) {
    this.systemConfigForm.patchValue(value);
  }

  handleLogoChange(file: any) {
    this.systemConfigForm.patchValue({ logo: file });
  }
}
