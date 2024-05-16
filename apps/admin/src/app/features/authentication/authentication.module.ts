import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxCardModule } from '../../shared/ui/card/card.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MxButtonComponent,
    MxInputComponent,
    MxIconComponent,
    MxCardModule,
  ],
})
export class AuthenticationModule {}
