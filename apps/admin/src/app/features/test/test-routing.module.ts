import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './test-list/test-list.component';
import { CreateTestComponent } from './modify-test/create-test.component';
import { UpdateTestComponent } from './modify-test/update-test.component';

const routes: Routes = [
{
  path: '',
  component: TestListComponent
},
{
  path:'create',
  component: CreateTestComponent
},
{
  path: 'update/:id',
  component: UpdateTestComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
