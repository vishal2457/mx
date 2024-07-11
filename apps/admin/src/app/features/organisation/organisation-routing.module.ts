import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { CreateOrganisationComponent } from './modify-organisation/create-organisation.component';
import { UpdateOrganisationComponent } from './modify-organisation/update-organisation.component';

const routes: Routes = [
{
  path: 'list',
  component: OrganisationListComponent
},
{
  path:'create',
  component: CreateOrganisationComponent
},
{
  path: 'update/:id',
  component: UpdateOrganisationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
