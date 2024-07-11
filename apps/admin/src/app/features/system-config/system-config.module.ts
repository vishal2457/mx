import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxCheckboxComponent } from '../../shared/ui/form/mx-checkbox';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxIconComponent } from '../../shared/ui/icon';

import { CreateSystemConfigComponent } from './modify-system-config/create-system-config.component';
import { SystemConfigFormComponent } from './modify-system-config/system-config-form/system-config-form.component';
import { SystemConfigRoutingModule } from './system-config-routing.module';

@NgModule({
  declarations: [SystemConfigFormComponent, CreateSystemConfigComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    SystemConfigRoutingModule,
    MxButtonComponent,
    MxIconComponent,
    MxFormComponent,
    MxGridFilterComponent,
    MxFileUploadComponent,
    MxTextareaComponent,
    MxCheckboxComponent,
    MxInputComponent,
  ],
})
export class SystemConfigModule {}
