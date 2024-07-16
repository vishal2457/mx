import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MxButtonComponent } from '../../../../shared/ui/button';
import { MxDialogModule } from '../../../../shared/ui/dialog/dialog.module';
import { patchableDate } from '../../../../shared/utils/patchable-date';
import { MxInputComponent } from '../../../../shared/ui/form/mx-input';
import { MxSelectComponent } from '../../../../shared/ui/form/mx-select';
import { ApiService } from '../../../../shared/services/api.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'add-membership-dialog',
  imports: [
    MxDialogModule,
    MxButtonComponent,
    MxInputComponent,
    MxSelectComponent,
  ],
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
        type="date"
        [control]="membershipForm.controls.startDate"
        label="Membership Start Date"
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMembershipDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: { memberID: number; email: string },
  ) {}

  @ViewChild('planSelect', { static: false }) planSelect!: MxSelectComponent;

  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  membershipForm = this.fb.group({
    planID: new FormControl(null, {
      validators: [Validators.required],
    }),
    startDate: new FormControl(patchableDate(), {
      validators: [Validators.required],
    }),
  });

  handleMembershipAdd() {
    const periodInMonths = this.planSelect.items.find(
      (i) => i.id === this.membershipForm.value.planID,
    ).periodInMonths;
    this.api.post(`/member/renew-membership/${this.data.memberID}`, {
      ...this.membershipForm.value,
      periodInMonths,
      email: this.data.email,
    });
  }
}
