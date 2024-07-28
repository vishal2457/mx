import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';

import { MxBadgeComponent } from '../../shared/ui/badge';
import { MxDialogModule } from '../../shared/ui/dialog/dialog.module';
import { MxInputNumberComponent } from '../../shared/ui/form/mx-input-number';
import { MxSelectComponent } from '../../shared/ui/form/mx-select/mx-select';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberRoutingModule } from './member-routing.module';
import { CreateMemberComponent } from './modify-member/create-member.component';
import { MemberFormComponent } from './modify-member/member-form/member-form.component';
import { UpdateMemberComponent } from './modify-member/update-member/update-member.component';
import { MxCardModule } from '../../shared/ui/card/card.module';
import { AddMembershipDialogComponent } from './components/add-membership.component';
import { StatsCardComponent } from './components/stats-card.component';
import { DisplayCurrencyComponent } from '../../shared/misc/display-currency.component';
import { QuickAddMemberComponent } from './components/quick-add.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberFormComponent,
    CreateMemberComponent,
    UpdateMemberComponent,
    AddMembershipDialogComponent,
    StatsCardComponent,
    QuickAddMemberComponent,
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
    MxDialogModule,
    MxInputNumberComponent,
    MxGridShellComponent,
    MxBadgeComponent,
    DisplayCurrencyComponent,
    MxCardModule,
  ],
})
export class MemberModule {}
