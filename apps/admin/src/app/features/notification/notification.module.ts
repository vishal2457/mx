import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxSelectComponent } from '../../shared/ui/form/mx-select';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxImageComponent } from '../../shared/ui/display-image';
import { CreateNotificationComponent } from './modify-notification/create-notification.component';
import { NotificationFormComponent } from './modify-notification/notification-form/notification-form.component';

@NgModule({
  declarations: [
    NotificationListComponent,
    CreateNotificationComponent,
    NotificationFormComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MxGridShellComponent,
    MxGridToolbarComponent,
    GridColumnsComponent,
    MxGridFilterComponent,
    MxActionComponent,
    PageHeaderComponent,
    MxFormComponent,
    MxInputComponent,
    MxSelectComponent,
    MxFileUploadComponent,
    MxTextareaComponent,
    MxImageComponent,
  ],
})
export class NotificationModule {}
