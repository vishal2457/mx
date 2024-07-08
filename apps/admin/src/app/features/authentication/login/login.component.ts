import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { R_userLogin } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SidebarService } from '../../../shared/services/sidebar.service';

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
    private ls: LocalStorageService
  ) {}

  showErrors = false;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  private sidebarService = inject(SidebarService);

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.api.post<R_userLogin>('/user/login', this.loginForm.value).subscribe({
      next: (data) => {
        this.ls.set('token', data.data.token);
        this.sidebarService.setMenu([]);
        this.router.navigate(['/']);
      },
    });
  }
}
