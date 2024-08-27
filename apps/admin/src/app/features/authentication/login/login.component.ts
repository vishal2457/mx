import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { MENU_DATA } from '../../../shared/constants/menu-contstant';
import { TRolePermission } from '../../../../../../../libs/mx-schema/src';
import { MxNotification } from '../../../shared/ui/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private ls: LocalStorageService,
  ) {}

  private toast = inject(MxNotification);

  forgotPassword = false;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  handleSubmit() {
    if (this.forgotPassword) {
      this.handleForgotPassword();
    } else {
      this.login();
    }
  }

  handleForgotPassword() {
    if (!this.loginForm.value.email) {
      this.loginForm.markAllAsTouched();
    }
    this.api
      .post('/user/forgot-password', { email: this.loginForm.value.email })
      .subscribe({
        next: () => {
          this.forgotPassword = false;
          this.loginForm.reset();
          this.toast.show({
            type: 'success',
            text: 'New password has been sent to your email',
          });
        },
      });
    // handle forgot password
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.api
      .post<{
        token: string;
        permissions: TRolePermission;
      }>('/user/login', this.loginForm.value)
      .subscribe({
        next: (data) => {
          this.ls.set('token', data.data.token);
          const initMenu = MENU_DATA.find(
            (m) => data.data.permissions[0].rolePermission.menuName === m.name,
          );
          this.router.navigate([initMenu?.link]);
        },
      });
  }
}
