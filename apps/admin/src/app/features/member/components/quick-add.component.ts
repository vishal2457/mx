import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TMember } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxSelectComponent } from '../../../shared/ui/form/mx-select/mx-select';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ControlsOf } from '../../../shared/utils/form-controls-of';
import { patchableDate } from '../../../shared/utils/patchable-date';

@Component({
  selector: 'quick-add-member',
  template: ` <mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title>Add Member</mx-dialog-title>
      <mx-dialog-description
        >Link will be sent to clients mail, to complete
        profile</mx-dialog-description
      >
    </mx-dialog-header>
    <div class="grid grid-cols-1 gap-4">
      <mx-select
        class="flex-1"
        label="Plan"
        [control]="form.controls.planID"
        bindLabel="name"
        bindValue="id"
        apiURL="/plan/all"
        [patchFirstEntry]="true"
        #planSelect
      />
      <mx-input label="Name" [control]="form.controls.name" />
      <mx-input label="Email" [control]="form.controls.email" />
      <mx-select
        label="Assigned User"
        [control]="form.controls.userID"
        apiURL="/user/all"
        bindLabel="name"
        bindValue="id"
        [patchFirstEntry]="true"
      />
      <mx-input
        label="Join Date"
        type="date"
        [control]="form.controls.joinDate"
      />
    </div>

    <mx-dialog-footer>
      <mx-button
        size="sm"
        (handleClick)="handleSubmit()"
        [disabled]="form.invalid"
        >Save</mx-button
      >
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class QuickAddMemberComponent {
  @ViewChild('planSelect', { static: false }) planSelect!: MxSelectComponent;

  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private notif = inject(MxNotification);

  form = this.fb.group<
    ControlsOf<
      Pick<TMember, 'name' | 'email' | 'userID' | 'joinDate'> & {
        planID: number;
      }
    >
  >({
    planID: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    userID: new FormControl(null, [Validators.required]),
    joinDate: new FormControl(patchableDate(), [Validators.required]),
  });

  handleSubmit() {
    this.notif.show({
      text: 'Adding Member',
      id: 'add-member',
      type: 'loading',
    });

    this.api.post('/member/create', this.getFormValue()).subscribe({
      next: () => {
        this.notif.updateToast({
          text: 'Member added',
          id: 'add-member',
          type: 'success',
        });
      },
    });
  }

  private getFormValue() {
    const periodInMonths = this.planSelect.items.find(
      (i) => i.id === this.form.value.planID,
    ).periodInMonths;
    return {
      ...this.form.value,
      periodInMonths,
      quickAdd: true,
    };
  }
}
