import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './modify-event/create-event.component';
import { UpdateEventComponent } from './modify-event/update-event.component';

const routes: Routes = [
{
  path: 'list',
  component: EventListComponent
},
{
  path:'create',
  component: CreateEventComponent
},
{
  path: 'update/:id',
  component: UpdateEventComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
