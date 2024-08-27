import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { MxCardModule } from '../../shared/ui/card/card.module';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxDropdownModule } from '../../shared/ui/dropdown/dropdown.module';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxSelectComponent } from '../../shared/ui/form/mx-select/mx-select';
import { MxDataGridModule } from '../../shared/ui/mx-data-grid/data-grid.module';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayCurrencyComponent } from '../../shared/misc/display-currency.component';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxBadgeComponent } from '../../shared/ui/badge';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MxCardModule,
    MxIconComponent,
    MxDataGridModule,
    MxActionComponent,
    MxDropdownModule,
    MxButtonComponent,
    MxSelectComponent,
    DisplayCurrencyComponent,
    MxGridShellComponent,
    MxBadgeComponent,
    MxSelectComponent,
  ],
})
export class AnalyticsModule {}
