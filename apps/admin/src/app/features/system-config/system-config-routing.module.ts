import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSystemConfigComponent } from './modify-system-config/create-system-config.component';

const routes: Routes = [
  {
    path: '',
    component: CreateSystemConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemConfigRoutingModule {}
