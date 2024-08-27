import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxImageComponent } from '../../shared/ui/display-image';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MemberPlanListComponent } from './member-plan-list/member-plan-list.component';
import { MemberPlanRoutingModule } from './member-plan-routing.module';
import { MxCardModule } from '../../shared/ui/card/card.module';

@NgModule({
  declarations: [MemberPlanListComponent],
  imports: [
    MxImageComponent,
    CommonModule,
    MxGridShellComponent,
    MxGridToolbarComponent,
    GridColumnsComponent,
    MxGridFilterComponent,
    PageHeaderComponent,
    MemberPlanRoutingModule,
    MxCardModule,
  ],
})
export class MemberplanModule {}
