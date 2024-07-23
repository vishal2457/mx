import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { CreateEnquiryComponent } from './modify-enquiry/create-enquiry.component';
import { UpdateEnquiryComponent } from './modify-enquiry/update-enquiry.component';

const routes: Routes = [
{
  path: 'list',
  component: EnquiryListComponent
},
{
  path:'create',
  component: CreateEnquiryComponent
},
{
  path: 'update/:id',
  component: UpdateEnquiryComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryRoutingModule { }
