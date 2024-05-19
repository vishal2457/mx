import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TRole } from 'tp-schema';
import { ControlsOf } from 'src/app/shared/utils/form-controls-of';
import { Z_role } from '../../../../../../../../libs/mx-schema/src';


@Component({
  selector: 'role-form',
  templateUrl: './role-form.component.html',
})
export class RoleFormComponent {

  showErrors = false;
  Z_role = Z_role

  private fb = inject(FormBuilder);

  roleForm = this.fb.nonNullable.group<ControlsOf<TRole>>({
    id: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    name: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    createdAt: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    udpatedAt: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.roleForm.controls;
  }

}
