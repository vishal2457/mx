import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'notification-form',
  templateUrl: './notification-form.component.html',
})
export class NotificationFormComponent {
  private fb = inject(FormBuilder);

  notificationForm = this.fb.nonNullable.group({});
  showErrors = false;

  get matchFormControls() {
    return this.notificationForm.controls;
  }
}
