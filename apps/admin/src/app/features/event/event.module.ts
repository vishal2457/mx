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

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './modify-event/event-form/event-form.component';
import { CreateEventComponent } from './modify-event/create-event.component';
import { UpdateEventComponent } from './modify-event/update-event.component';
import { MxHintComponent } from '../../shared/ui/hint';

@NgModule({
  declarations: [
    EventListComponent,
    EventFormComponent,
    CreateEventComponent,
    UpdateEventComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    EventRoutingModule,
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
    MxHintComponent,
  ],
})
export class EventModule {}
