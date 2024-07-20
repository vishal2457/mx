import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { CreateExerciseComponent } from './modify-exercise/create-exercise.component';
import { UpdateExerciseComponent } from './modify-exercise/update-exercise.component';

const routes: Routes = [
{
  path: 'list',
  component: ExerciseListComponent
},
{
  path:'create',
  component: CreateExerciseComponent
},
{
  path: 'update/:id',
  component: UpdateExerciseComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
