import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-list',
  template: `<mx-grid-shell gridTitle="Users" apiURL="/user/list">
    <mx-toolbar icon="add" name="Add" (handleClick)="add()" />

    <!-- columns -->
    <mx-column field="id" alignment="left" />
    <mx-column field="email" alignment="left" />
    <mx-column field="active" alignment="left" />
    <!-- columns -->

    <!-- filters -->
    <mx-grid-filter label="Id" field="id" />
    <mx-grid-filter label="Email" field="email" />
    <!-- filters -->

    <!-- actions -->
    <mx-action icon="delete" (handleClick)="delete($event)" tooltip="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class UserListComponent {
  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private dialog = inject(Dialog);

  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  add() {
    this.router.navigate(['/user/create']);
  }

  delete(e) {
    const ref = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      maxHeight: '500px',
      data: {
        title: `Are you sure you want to delete user ${e.cellData.email}?`,
        description: 'This action will not be reverted once done.',
      },
    });
    ref.closed.subscribe((result: any) => {
      if (result.success) {
        this.api.delete(`/user/delete/${e.cellData.id}`).subscribe(() => {
          this.gridShell.refresh();
          this.notif.show({
            text: 'User Deleted',
            type: 'success',
          });
        });
      }
    });
  }
}
