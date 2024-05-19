import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mx-match-list',
  template: `<mx-grid-shell
    gridTitle="Notifications"
    apiURL="/notification/list"
  >
    <mx-toolbar icon="add" name="Add" (handleClick)="create()" />
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
