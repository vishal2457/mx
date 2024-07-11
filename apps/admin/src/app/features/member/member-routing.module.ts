import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { CreateMemberComponent } from './modify-member/create-member.component';
import { UpdateMemberComponent } from './modify-member/update-member.component';

const routes: Routes = [
{
  path: 'list',
  component: MemberListComponent
},
{
  path:'create',
  component: CreateMemberComponent
},
{
  path: 'update/:id',
  component: UpdateMemberComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
