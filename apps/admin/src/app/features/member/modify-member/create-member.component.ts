import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MemberFormComponent } from './member-form/member-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-member',
  template: `<page-header header="Add Member">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <member-form />`,
})
export class CreateMemberComponent implements OnDestroy {
  @ViewChild(MemberFormComponent) MemberFormComponent!: MemberFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.MemberFormComponent.isInValid()) {
      this.MemberFormComponent.markFormTouched();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Member',
      id: 'add-member',
      type: 'loading',
    });
    const formValue = this.MemberFormComponent.getFormValue();

    this.addRequests.sink = this.api
      .post('/member/create', formValue)
      .subscribe({
        next: () => {
          this.MemberFormComponent.reset();
          this.notif.updateToast({
            text: 'Member added',
            id: 'add-member',
            type: 'success',
          });
        },
      });
  }
}
