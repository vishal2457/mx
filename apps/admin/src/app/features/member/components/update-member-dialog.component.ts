import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TMember } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'update-member',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title>Update member details</mx-dialog-title>
      <mx-dialog-description
        >You can update specific member details from here</mx-dialog-description
      >
    </mx-dialog-header>
    <div class="grid grid-cols-1 gap-4">
      <mx-select
        apiURL="/workout-template/all"
        bindLabel="name"
        bindValue="id"
        label="Workout Template"
        [control]="memberForm.controls.workoutTemplateID"
      />
      <mx-select
        label="Assigned User"
        [control]="memberForm.controls.userID"
        apiURL="/user/all"
        bindLabel="name"
        bindValue="id"
      />
      <mx-input
        [type]="'date'"
        [control]="memberForm.controls.joinDate"
        label="Membership Start Date"
      />
      <mx-textarea
        [control]="memberForm.controls.address"
        label="Address"
        placeholder="Enter full address"
      />
    </div>
    <mx-dialog-footer>
      <mx-button
        size="sm"
        [disabled]="memberForm.invalid"
        (handleClick)="handleSubmit()"
        >Save</mx-button
      >
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class UpdateMemberDialogComponent {
  constructor(
    private dialogRef: DialogRef<{ success: boolean }>,
    @Inject(DIALOG_DATA) private data: TMember,
  ) {}

  private fb = inject(FormBuilder);
  private toast = inject(MxNotification);
  private api = inject(ApiService);

  private requests = new SubSink();

  memberForm = this.fb.group({
    workoutTemplateID: new FormControl(this.data.workoutTemplateID, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userID: new FormControl(this.data.userID, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    address: new FormControl(this.data.address),
    joinDate: new FormControl(this.data.joinDate, {
      validators: [Validators.required],
    }),
  });

  protected handleSubmit() {
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }
    this.requests.unsubscribe();
    this.toast.show({
      text: 'Updating Member',
      id: 'update-member',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/member/update/${this.data.id}`, {
        ...this.data,
        ...this.memberForm.value,
      })
      .subscribe({
        next: () => {
          this.toast.updateToast({
            text: 'Member updated',
            id: 'update-member',
            type: 'success',
          });
          this.dialogRef.close({ success: true });
        },
      });
  }
}
