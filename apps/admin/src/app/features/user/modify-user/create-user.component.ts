import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'add-user',
  template: `<page-header header="Add User">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <user-form />`,
})
export class CreateUserComponent implements OnDestroy {
  @ViewChild(UserFormComponent) UserFormComponent!: UserFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.UserFormComponent.isInvalid()) {
      this.UserFormComponent.validate();
      return;
    }
    this.addRequests.unsubscribe();

    this.notif.show({
      text: 'Adding User',
      id: 'add-user',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/user/create', this.UserFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.UserFormComponent.reset();
          this.notif.updateToast({
            text: 'User added',
            id: 'add-user',
            type: 'success',
          });
        },
      });
  }
}
