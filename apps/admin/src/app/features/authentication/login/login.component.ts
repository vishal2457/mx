import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { MENU_DATA } from '../../../shared/constants/menu-contstant';
import { TRolePermission } from '../../../../../../../libs/mx-schema/src';

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

  showErrors = false;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.showErrors = true;
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
