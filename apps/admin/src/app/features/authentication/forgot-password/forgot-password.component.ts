import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'forgot-password',
  template: ` <div class="grid gap-4">
    <div class="grid gap-2">
      <mx-input
        [control]="form.controls.email"
        type="email"
        label="Email"
        placeholder="name@example.com"
      />
      <div>
        <a class="text-sm text-blue-500 cursor-pointer hover:underline"
          >Login?</a
        >
      </div>
    </div>
    <mx-button type="button" (handleClick)="handleSubmit()">Submit</mx-button>
  </div>`,
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  handleSubmit() {
    // handle forgot password
  }
}
