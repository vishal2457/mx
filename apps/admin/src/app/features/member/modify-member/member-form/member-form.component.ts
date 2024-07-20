import { Dialog, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  GENDERS,
  TMember,
  TPlan,
  Z_member,
} from '../../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../../shared/services/api.service';
import { MxSelectComponent } from '../../../../shared/ui/form/mx-select/mx-select';
import { MxNotification } from '../../../../shared/ui/notification/notification.service';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { patchableDate } from '../../../../shared/utils/patchable-date';
import { SubSink } from '../../../../shared/utils/sub-sink';

type TMemberForm = Omit<
  TMember,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'joinDate'
  | 'organisationID'
  | 'profilePic'
  | 'weight'
  | 'age'
  | 'height'
  | 'passcode'
> & {
  joinDate?: string;
  planID?: number;
  weight?: number;
  age?: number;
  height?: number;
};

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberFormComponent implements OnInit, OnDestroy {
  @ViewChild('planSelect', { static: false }) planSelect!: MxSelectComponent;

  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private toast = inject(MxNotification);

  @Input({ required: true }) formType: 'create' | 'update' = 'create';

  Z_member = Z_member;
  dialogRef!: DialogRef<any>;
  periodInMonthHint: string[] = [];
  GENDER = Array.from(GENDERS);

  private subs = new SubSink();

  memberForm = this.fb.nonNullable.group<ControlsOf<TMemberForm>>({
    name: new FormControl(null, {
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
    emergencyContact: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    gender: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    workoutTemplateID: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userID: new FormControl(null, {
      validators: [Validators.required],
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
    if (this.formType === 'create') {
      this.memberForm.addControl(
        'planID',
        new FormControl(null, {
          validators: [Validators.required],
          nonNullable: true,
        }),
      );

      this.memberForm.addControl(
        'joinDate',
        new FormControl(patchableDate(), {
          validators: [Validators.required],
          nonNullable: true,
        }),
      );
      this.memberForm.addControl(
        'weight',
        new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(3)],
          nonNullable: true,
        }),
      );
      this.memberForm.addControl(
        'age',
        new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(3)],
          nonNullable: true,
        }),
      );
      this.memberForm.addControl(
        'height',
        new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(3)],
          nonNullable: true,
        }),
      );
    }

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
    if (this.formType === 'update') {
      return this.memberForm.getRawValue();
    }
    const periodInMonths = this.planSelect.items.find(
      (i) => i.id === this.memberForm.value.planID,
    ).periodInMonths;
    return {
      ...this.memberForm.getRawValue(),
      periodInMonths,
    };
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
