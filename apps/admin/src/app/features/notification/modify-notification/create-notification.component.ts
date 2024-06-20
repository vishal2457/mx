import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { NotificationFormComponent } from './notification-form/notification-form.component';

@Component({
  selector: 'create-notification',
  template: `<page-header header="Add Notification">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button></page-header
    >
    <notification-form />`,
})
export class CreateNotificationComponent implements AfterViewInit, OnDestroy {
  @ViewChild(NotificationFormComponent)
  NotificationFormComponent!: NotificationFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  router = inject(Router);

  notificationForm!: FormGroup;
  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  ngAfterViewInit(): void {
    this.notificationForm = this.NotificationFormComponent.notificationForm;
  }

  handleSubmit() {
    if (this.notificationForm.invalid) {
      this.NotificationFormComponent.showErrors = true;
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding notification',
      id: 'add-notification',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/notification/create', this.notificationForm.value)
      .subscribe({
        next: () => {
          this.notificationForm.reset();
          this.router.navigate(['/notification/list']);
          this.notif.updateToast({
            text: 'notification added',
            id: 'add-notification',
            type: 'success',
          });
        },
      });
  }
}
