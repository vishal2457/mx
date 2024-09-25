import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'event-list',
  template: ` <page-header header="Event" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Event</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Events" apiURL="/event/list">
      <!-- columns -->
      <mx-column field="title" />
      <mx-column field="description" />
      <mx-column field="image" />
      <mx-column field="active" />
      <mx-column field="eventDate" />
      <mx-column field="eventTime" />
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Title" field="title" />
      <mx-grid-filter label="Description" field="description" />
      <mx-grid-filter label="Image" field="image" />
      <mx-grid-filter label="Active" field="active" />
      <mx-grid-filter label="EventDate" field="eventDate" />
      <mx-grid-filter label="EventTime" field="eventTime" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class EventListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/event/create']);
  }

  edit(e: any) {
    this.router.navigate(['/event/update/' + e.cellData.id]);
  }
}
