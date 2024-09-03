import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';

import { MxDialogModule } from '../../shared/ui/dialog/dialog.module';
import { MxInputNumberComponent } from '../../shared/ui/form/mx-input-number';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanRoutingModule } from './plan-routing.module';

@NgModule({
  declarations: [PlanListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    PlanRoutingModule,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxButtonComponent,
    MxIconComponent,
    MxActionComponent,
    MxFormComponent,
    MxGridFilterComponent,
    MxInputComponent,
    MxInputNumberComponent,
    MxDialogModule,
  ],
})
export class PlanModule {}
