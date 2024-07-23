import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxCheckboxComponent } from '../../shared/ui/form/mx-checkbox';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';

import { MxCardModule } from '../../shared/ui/card/card.module';
import { MxDialogModule } from '../../shared/ui/dialog/dialog.module';
import { MxInputNumberComponent } from '../../shared/ui/form/mx-input-number';
import { MxSelectComponent } from '../../shared/ui/form/mx-select/mx-select';
import { MxDataGridModule } from '../../shared/ui/mx-data-grid/data-grid.module';
import { AddWorkoutDetailComponent } from './modify-workout-template/components/add-workout-details-dialog.component';
import { CreateWorkoutTemplateComponent } from './modify-workout-template/create-workout-template.component';
import { UpdateWorkoutTemplateComponent } from './modify-workout-template/update-workout-template.component';
import { WorkoutTemplateFormComponent } from './modify-workout-template/workout-template-form/workout-template-form.component';
import { WorkoutTemplateListComponent } from './workout-template-list/workout-template-list.component';
import { WorkoutTemplateRoutingModule } from './workout-template-routing.module';
import { MxTooltipDirective } from '../../shared/ui/tooltip/tooltip.directive';

@NgModule({
  declarations: [
    WorkoutTemplateListComponent,
    WorkoutTemplateFormComponent,
    CreateWorkoutTemplateComponent,
    UpdateWorkoutTemplateComponent,
    AddWorkoutDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    WorkoutTemplateRoutingModule,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxButtonComponent,
    MxIconComponent,
    MxActionComponent,
    MxFormComponent,
    MxGridFilterComponent,
    MxCheckboxComponent,
    MxInputComponent,
    MxSelectComponent,
    MxCardModule,
    MxDataGridModule,
    MxDialogModule,
    MxInputNumberComponent,
    MxTooltipDirective,
  ],
})
export class WorkoutTemplateModule {}
