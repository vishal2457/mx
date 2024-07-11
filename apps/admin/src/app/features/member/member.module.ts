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

import { MemberRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberFormComponent } from './modify-member/member-form/member-form.component';
import { CreateMemberComponent } from './modify-member/create-member.component';
import { UpdateMemberComponent } from './modify-member/update-member.component';
import { MxSelectComponent } from '../../shared/ui/form/mx-select';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberFormComponent,
    CreateMemberComponent,
    UpdateMemberComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    MemberRoutingModule,
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
    MxInputComponent,
    MxSelectComponent,
  ],
})
export class MemberModule {}
