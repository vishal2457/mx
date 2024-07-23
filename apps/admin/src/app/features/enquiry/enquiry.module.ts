import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxIconComponent } from '../../shared/ui/icon';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxCheckboxComponent } from '../../shared/ui/form/mx-checkbox';
import { MxInputComponent } from '../../shared/ui/form/mx-input';

import { EnquiryRoutingModule } from './enquiry-routing.module';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnquiryFormComponent } from './modify-enquiry/enquiry-form/enquiry-form.component';
import { CreateEnquiryComponent } from './modify-enquiry/create-enquiry.component';
import { UpdateEnquiryComponent } from './modify-enquiry/update-enquiry.component';

@NgModule({
  declarations: [
    EnquiryListComponent,
    EnquiryFormComponent,
    CreateEnquiryComponent,
    UpdateEnquiryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    EnquiryRoutingModule,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxButtonComponent,
    MxIconComponent,
    MxActionComponent,
    MxFormComponent,
    MxGridFilterComponent,
    MxFileUploadComponent,
    MxTextareaComponent,
    MxCheckboxComponent,
    MxInputComponent
  ],
})
export class EnquiryModule {}
