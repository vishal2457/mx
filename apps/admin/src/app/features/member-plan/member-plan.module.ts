import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxCheckboxComponent } from '../../shared/ui/form/mx-checkbox';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';

import { MemberPlanListComponent } from './member-plan-list/member-plan-list.component';
import { MemberPlanRoutingModule } from './member-plan-routing.module';

@NgModule({
  declarations: [MemberPlanListComponent],
  imports: [
    CommonModule,
    PageHeaderComponent,
    MemberPlanRoutingModule,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxButtonComponent,
    MxIconComponent,
    MxGridFilterComponent,
  ],
})
export class MemberPlanModule {}
