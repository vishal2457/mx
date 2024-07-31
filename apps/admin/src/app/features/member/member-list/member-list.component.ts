import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuickAddMemberComponent } from '../components/quick-add.component';
import { ViewInvoiceComponent } from '../components/invoice.component';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
})
export class MemberListComponent {
  private router = inject(Router);
  private dialog = inject(Dialog);

  create() {
    this.router.navigate(['/member/create']);
  }

  edit(e: any) {
    this.router.navigate(['/member/update/' + e.cellData.member.id]);
  }

  openQuickAddDialog() {
    this.dialog.open(QuickAddMemberComponent);
  }

  openViewInvoice(e: any) {
    this.dialog.open(ViewInvoiceComponent, {
      data: { memberID: e.cellData.member.id },
    });
  }
}
