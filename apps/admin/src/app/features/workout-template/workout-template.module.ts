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

import { WorkoutTemplateRoutingModule } from './workout-template-routing.module';
import { WorkoutTemplateListComponent } from './workout-template-list/workout-template-list.component';
import { WorkoutTemplateFormComponent } from './modify-workout-template/workout-template-form/workout-template-form.component';
import { CreateWorkoutTemplateComponent } from './modify-workout-template/create-workout-template.component';
import { UpdateWorkoutTemplateComponent } from './modify-workout-template/update-workout-template.component';
import { MxSelectComponent } from '../../shared/ui/form/mx-select/mx-select';
import { MxCardModule } from '../../shared/ui/card/card.module';

@NgModule({
  declarations: [
    WorkoutTemplateListComponent,
    WorkoutTemplateFormComponent,
    CreateWorkoutTemplateComponent,
    UpdateWorkoutTemplateComponent,
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
    MxFileUploadComponent,
    MxTextareaComponent,
    MxCheckboxComponent,
    MxInputComponent,
    MxSelectComponent,
    MxCardModule,
  ],
})
export class WorkoutTemplateModule {}
