import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mx-match-list',
  template: ` <page-header header="Notification" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add New</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Notifications" apiURL="/notification/list">
      <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="title" />
      <mx-column field="body" />
      <!-- columns -->
    </mx-grid-shell>`,
})
export class NotificationListComponent {
  private router = inject(Router);
  create() {
    this.router.navigate(['/notification/add']);
  }
}
