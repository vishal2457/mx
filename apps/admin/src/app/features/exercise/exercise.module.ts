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

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseFormComponent } from './modify-exercise/exercise-form/exercise-form.component';
import { CreateExerciseComponent } from './modify-exercise/create-exercise.component';
import { UpdateExerciseComponent } from './modify-exercise/update-exercise.component';
import { MxSelectComponent } from '../../shared/ui/form/mx-select/mx-select';
import { AddBodyPartComponent } from './modify-exercise/components/add-body-part.component';
import { MxDialogModule } from '../../shared/ui/dialog/dialog.module';

@NgModule({
  declarations: [
    ExerciseListComponent,
    ExerciseFormComponent,
    CreateExerciseComponent,
    UpdateExerciseComponent,
    AddBodyPartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    ExerciseRoutingModule,
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
    MxDialogModule,
  ],
})
export class ExerciseModule {}
