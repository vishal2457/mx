import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuickAddMemberComponent } from '../components/quick-add.component';
import { ViewInvoiceComponent } from '../components/invoice.component';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
})
export class MemberListComponent implements OnDestroy {
  @ViewChild(MxGridShellComponent, { static: false })
  gridShell!: MxGridShellComponent;

  private router = inject(Router);
  private dialog = inject(Dialog);

  private subs = new SubSink();

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  create() {
    this.router.navigate(['/member/create']);
  }

  edit(e: any) {
    this.router.navigate(['/member/update/' + e.cellData.member.id]);
  }

  openQuickAddDialog() {
    const ref = this.dialog.open(QuickAddMemberComponent);
    this.subs.sink = ref.closed.subscribe((data: any) => {
      this.gridShell.refresh();
      this.subs.unsubscribe();
    });
  }

  openViewInvoice(e: any) {
    this.dialog.open(ViewInvoiceComponent, {
      data: { memberID: e.cellData.member.id },
    });
  }
}
