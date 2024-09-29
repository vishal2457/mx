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
  Z_member,
} from '../../../../../../../../libs/mx-schema/src';
import { UserService } from '../../../../shared/services/user-data.service';
import { MxSelectComponent } from '../../../../shared/ui/form/mx-select/mx-select';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { patchableDate } from '../../../../shared/utils/patchable-date';
import { SubSink } from '../../../../shared/utils/sub-sink';
import { QuickAddPlanComponent } from '../../../../shared/misc/quick-add-plan.component';

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
  | 'quickAdd'
  | 'experience'
  | 'goal'
  | 'weightGoal'
  | 'calorieGoal'
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

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private user = inject(UserService);

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
    active: new FormControl(true, {
      validators: [Validators.required],
    }),
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
          validators: [Validators.maxLength(3)],
          nonNullable: true,
        }),
      );
      this.memberForm.addControl(
        'age',
        new FormControl(null, {
          validators: [Validators.maxLength(3)],
          nonNullable: true,
        }),
      );
      this.memberForm.addControl(
        'height',
        new FormControl(null, {
          validators: [Validators.maxLength(3)],
          nonNullable: true,
        }),
      );
    }
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
    const selectedPlan = this.planSelect.items.find(
      (i) => i.id === this.memberForm.value.planID,
    );

    const org = this.user.getOrganisation();
    return {
      ...this.memberForm.getRawValue(),
      periodInMonths: selectedPlan.periodInMonths,
      amount: selectedPlan.amount,
      organisation: {
        name: org?.name,
        email: org?.email,
      },
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

  openPlanForm() {
    const ref = this.dialog.open(QuickAddPlanComponent);
    this.subs.sink = ref.closed.subscribe((data: any) => {
      this.planSelect.getItems();
      this.memberForm.controls.planID?.reset();
    });
  }
}
