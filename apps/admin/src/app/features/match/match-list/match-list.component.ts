import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ApiService } from '../../../shared/services/api.service';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';
import { GAME_SLUG } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'mx-match-list',
  template: `<mx-grid-shell
    gridTitle="Match List"
    apiURL="/match/list"
    fields="id,gameSlug,teamOne,teamTwo,league,format,venue,startTime,startDate,active"
  >
    <mx-toolbar icon="add" name="Add" (handleClick)="create()" />
    <!-- columns -->
    <mx-column field="id" alignment="left" [visible]="false" />
    <mx-column field="gameSlug" title="Game" />
    <mx-column field="teamOne" />
    <mx-column field="teamTwo" />
    <mx-column field="league" />
    <mx-column field="format" />
    <mx-column field="venue" />
    <mx-column field="startDate" />
    <mx-column field="startTime" />
    <mx-column field="active">
      <ng-template #cell let-item>
        @if(item.active) {
        <mx-badge [text]="item.active" variant="success" class="capitalize" />
        } @else {
        <mx-badge [text]="item.active" variant="error" class="capitalize" />
        }
      </ng-template>
    </mx-column>

    <!-- columns -->

    <!-- Filters -->
    <mx-grid-filter
      field="gameSlug"
      label="Game Slug"
      type="select"
      [items]="games"
    />
    <!-- Filters -->

    <!-- Action -->
    <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <mx-action icon="delete" tooltip="Edit" />
    <!-- Action -->
  </mx-grid-shell>`,
  styleUrl: './match-list.component.scss',
})
export class MatchListComponent {
  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);

  games = Array.from(GAME_SLUG);

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
