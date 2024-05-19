import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'notification-form',
  templateUrl: './notification-form.component.html',
})
export class NotificationFormComponent {
  private fb = inject(FormBuilder);

  notificationForm = this.fb.nonNullable.group({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    body: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  showErrors = false;

  get notificationFormControls() {
    return this.notificationForm.controls;
  }
}
