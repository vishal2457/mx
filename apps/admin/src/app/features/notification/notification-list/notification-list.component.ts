import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ApiService } from '../../../shared/services/api.service';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';

@Component({
  selector: 'mx-match-list',
  template: `<mx-grid-shell gridTitle="Matches" apiURL="/match/list">
    <mx-toolbar icon="add" name="Add" (handleClick)="create()" />
    <!-- columns -->
    <mx-column field="id" alignment="left" />
    <mx-column field="gameSlug" title="Game" alignment="left" />
    <mx-column field="teamOne" />
    <mx-column field="teamTwo" />
    <mx-column field="h2hTeam" />
    <mx-column field="league" />
    <mx-column field="format" />
    <mx-column field="venue" />
    <mx-column field="startTime" />
    <!-- columns -->

    <!-- Filters -->
    <mx-grid-filter field="gameSlug" label="Game Slug" type="select" />
    <!-- Filters -->

    <!-- Action -->
    <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <mx-action icon="delete" tooltip="Edit" />
    <!-- Action -->
  </mx-grid-shell>`,
})
export class NotificationListComponent {
  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);
  create() {
    this.router.navigate(['/match/add']);
  }

  edit(e: any) {
    this.router.navigate(['/match/edit/' + e.cellData.id]);
  }

  deleteItem(e: any) {
    this.api.delete(`/match/${e.cellData.id}`).subscribe(() => {
      // this.gridShell.refresh();
      this.notif.show({
        text: 'Match Deleted',
        type: 'success',
      });
    });
  }
}
