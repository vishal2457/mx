import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-list',
  template: `<mx-grid-shell gridTitle="Customers" apiURL="/test/list">
    <mx-toolbar icon="add" name="Add" (handleClick)="add()" />

    <!-- columns -->
    <mx-column field="id" alignment="left" />
    <mx-column field="name" alignment="left" />
    <!-- columns -->

    <!-- filters -->
    <mx-grid-filter label="Id" field="id" />
    <mx-grid-filter label="Name" field="name" />
    <!-- filters -->

    <!-- actions -->
    <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class TestListComponent {
  private router = inject(Router);

  add() {
    this.router.navigate(['/test/create']);
  }

  edit(e: any) {
    this.router.navigate(['/test/update/' + e.cellData.id]);
  }
}
