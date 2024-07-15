import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  GENDERS,
  TMember,
  TPlan,
  Z_member,
} from '../../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../../shared/services/api.service';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { patchableDate } from '../../../../shared/utils/patchable-date';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MxSelectComponent } from '../../../../shared/ui/form/mx-select';
import { MxNotification } from '../../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../../shared/utils/sub-sink';

type TMemberForm = Omit<
  TMember,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'joinDate'
  | 'organisationID'
  | 'profilePic'
> & { joinDate: string };

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
})
export class MemberFormComponent implements OnInit, OnDestroy {
  @ViewChild('planSelect', { static: true }) planSelect!: MxSelectComponent;

  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private toast = inject(MxNotification);

  formType: 'create' | 'update' = 'create';
  Z_member = Z_member;
  dialogRef!: DialogRef<any>;
  periodInMonthHint: string[] = [];
  GENDER = Array.from(GENDERS);

  private subs = new SubSink();

  memberForm = this.fb.nonNullable.group<ControlsOf<TMemberForm>>({
    planID: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    age: new FormControl(null, {
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

  planForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TPlan, 'id' | 'createdAt' | 'updatedAt'>>
  >({
    name: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    periodInMonths: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.subs.sink =
      this.planForm.controls.periodInMonths.valueChanges.subscribe((value) => {
        if (!value) {
          this.periodInMonthHint = [];
          return;
        }
        const converted = this.convertMonthsToYears(value);
        this.periodInMonthHint = [
          `${converted.years} year, ${converted.months} month`,
        ];
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

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

  markFormTouched() {
    this.memberForm.markAllAsTouched();
  }

  openPlanForm(ref) {
    this.dialogRef = this.dialog.open(ref);
  }

  closePlanForm() {
    if (!this.dialogRef) {
      return;
    }
    this.dialogRef.close();
  }

  handlePlanAdd() {
    if (this.planForm.invalid) {
      return;
    }
    this.api.post('/plan/create', this.planForm.value).subscribe(() => {
      this.planSelect.getItems();
      this.planForm.reset();
      this.closePlanForm();
      this.toast.show({
        text: 'Plan Added',
        type: 'success',
      });
    });
  }

  private convertMonthsToYears(months: number) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return { years, months: remainingMonths };
  }
}
