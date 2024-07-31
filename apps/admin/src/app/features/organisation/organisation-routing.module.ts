import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrganisationComponent } from './modify-organisation/create-organisation.component';

const routes: Routes = [
  {
    path: '',
    component: CreateOrganisationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationRoutingModule {}
