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
  template: `<page-header
      header="Add Notification"
      (save)="handleSubmit()"
      [loading]="false"
    />
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
      text: 'Adding Match',
      id: 'add-match',
      type: 'loading',
    });

    const formData = new FormData();
    for (const key in this.notificationForm.controls) {
      formData.append(key, this.notificationForm.value[key]);
    }

    this.addRequests.sink = this.api.post('/match/create', formData).subscribe({
      next: () => {
        this.notificationForm.reset();
        this.router.navigate(['/match/list']);
        this.notif.updateToast({
          text: 'Match added',
          id: 'add-match',
          type: 'success',
        });
      },
    });
  }
}
