import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberPlanListComponent } from './member-plan-list/member-plan-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: MemberPlanListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberPlanRoutingModule {}
