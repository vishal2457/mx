import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxIconComponent } from '../../shared/ui/icon';

import { TestListComponent } from './test-list/test-list.component';
import { TestFormComponent } from './modify-test/test-form/test-form.component';
import { CreateTestComponent } from './modify-test/create-test.component';
import { UpdateTestComponent } from './modify-test/update-test.component';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';

@NgModule({
  declarations: [
    TestListComponent,
    TestFormComponent,
    CreateTestComponent,
    UpdateTestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxInputComponent,
    MxButtonComponent,
    MxIconComponent,
    MxActionComponent,
    MxFormComponent,
    MxGridFilterComponent,
  ],
})
export class TestModule {}
