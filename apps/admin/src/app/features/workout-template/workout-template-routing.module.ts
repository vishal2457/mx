import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutTemplateListComponent } from './workout-template-list/workout-template-list.component';
import { CreateWorkoutTemplateComponent } from './modify-workout-template/create-workout-template.component';
import { UpdateWorkoutTemplateComponent } from './modify-workout-template/update-workout-template.component';

const routes: Routes = [
{
  path: 'list',
  component: WorkoutTemplateListComponent
},
{
  path:'create',
  component: CreateWorkoutTemplateComponent
},
{
  path: 'update/:id',
  component: UpdateWorkoutTemplateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutTemplateRoutingModule { }
