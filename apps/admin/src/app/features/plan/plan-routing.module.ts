import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanListComponent } from './plan-list/plan-list.component';
import { CreatePlanComponent } from './modify-plan/create-plan.component';
import { UpdatePlanComponent } from './modify-plan/update-plan.component';

const routes: Routes = [
{
  path: 'list',
  component: PlanListComponent
},
{
  path:'create',
  component: CreatePlanComponent
},
{
  path: 'update/:id',
  component: UpdatePlanComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
