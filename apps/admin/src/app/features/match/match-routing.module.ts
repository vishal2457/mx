import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchFormComponent } from './modify-match/match-form/match-form.component';
import { CreateMatchComponent } from './modify-match/create-match.component';

const routes: Routes = [
  {
    path: '',
    component: CreateMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
