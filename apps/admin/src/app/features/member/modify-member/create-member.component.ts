import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MemberFormComponent } from './member-form/member-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { Router } from '@angular/router';

@Component({
  selector: 'add-member',
  template: `<page-header header="Add Member">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <member-form formType="create" />`,
})
export class CreateMemberComponent implements OnDestroy {
  @ViewChild(MemberFormComponent) MemberFormComponent!: MemberFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private router = inject(Router);

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
          this.router.navigate(['/member/list']);

          this.notif.updateToast({
            text: 'Member added',
            id: 'add-member',
            type: 'success',
          });
        },
      });
  }
}
