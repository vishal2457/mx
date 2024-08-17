import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TMemberPlan, Z_memberPlan } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';


@Component({
  selector: 'memberPlan-form',
  templateUrl: './member-plan-form.component.html',
})
export class MemberPlanFormComponent {

  Z_memberPlan = Z_memberPlan

  private fb = inject(FormBuilder);

  memberPlanForm = this.fb.nonNullable.group<ControlsOf<TMemberPlan>>({
    id: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    memberID: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    planID: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    startDate: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    endDate: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    paid: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    createdAt: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
    updatedAt: new FormControl(null, {
      validators: [
      
      
      ],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.memberPlanForm.controls;
  }

  isInValid() {
    return this.memberPlanForm.invalid;
  }

  getFormValue() {
    return this.memberPlanForm.value;
  }

  reset() {
    this.memberPlanForm.reset();
  }

  patchValue(value) {
    this.memberPlanForm.patchValue(value);
  }



}
