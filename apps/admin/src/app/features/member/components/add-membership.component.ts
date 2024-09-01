import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MxSelectComponent } from '../../../shared/ui/form/mx-select/mx-select';
import { ApiService } from '../../../shared/services/api.service';
import { patchableDate } from '../../../shared/utils/patchable-date';
import { TMemberPlan } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'add-membership-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title>Add membership</mx-dialog-title>
      <mx-dialog-description
        >Add new membership for selected member</mx-dialog-description
      >
    </mx-dialog-header>
    <div class="grid grid-cols-1 gap-4">
      <mx-select
        class="flex-1"
        label="Plan"
        [control]="membershipForm.controls.planID"
        bindLabel="name"
        bindValue="id"
        apiURL="/plan/all"
        #planSelect
      />
      <mx-input
        [type]="'date'"
        [control]="membershipForm.controls.startDate"
        label="Membership Start Date"
      />
      <mx-select
        class="flex-1"
        label="Paid"
        [control]="membershipForm.controls.paid"
        bindLabel="name"
        bindValue="value"
        [items]="paidSelect"
      />
    </div>
    <mx-dialog-footer>
      <mx-button
        size="sm"
        (handleClick)="handleMembershipAdd()"
        [disabled]="membershipForm.invalid"
        >Save</mx-button
      >
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class AddMembershipDialogComponent implements OnInit {
  constructor(
    private dialogRef: DialogRef<{ refresh: boolean }>,
    @Inject(DIALOG_DATA)
    private data: {
      memberID: number;
      email: string;
      edit: boolean;
      payload: TMemberPlan;
    },
  ) {}

  @ViewChild('planSelect', { static: false }) planSelect!: MxSelectComponent;

  paidSelect = [
    {
      name: 'Yes',
      value: true,
    },
    {
      name: 'No',
      value: false,
    },
  ];

  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  membershipForm = this.fb.group({
    planID: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    startDate: new FormControl(patchableDate(), {
      validators: [Validators.required],
    }),
    paid: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    if (this.data.edit) {
      const { planID, startDate, paid } = this.data.payload;
      this.membershipForm.patchValue({
        planID,
        startDate: patchableDate(startDate),
        paid,
      });
    }
  }

  handleMembershipAdd() {
    const periodInMonths = this.planSelect.items.find(
      (i) => i.id === this.membershipForm.value.planID,
    ).periodInMonths;
    const payload = {
      ...this.membershipForm.value,
      periodInMonths,
      email: this.data.email,
    };

    let req = this.api.post(`/member/renew-membership/${this.data.memberID}`, {
      ...this.membershipForm.value,
      periodInMonths,
      email: this.data.email,
    });

    if (this.data.edit) {
      req = this.api.put(
        `/member/update-membership/${this.data.payload.id}/${this.data.memberID}`,
        {
          ...this.membershipForm.value,
          periodInMonths,
          email: this.data.email,
        },
      );
    }

    req.subscribe(() => {
      this.dialogRef.close({ refresh: true });
    });
  }
}
