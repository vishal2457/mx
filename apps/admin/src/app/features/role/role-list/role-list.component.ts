import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  template: `<mx-grid-shell gridTitle="Manage Roles" apiURL="/role/list">
    <mx-toolbar icon="add" name="Add" (handleClick)="add()" />

    <!-- columns -->
    <mx-column field="id" alignment="left" />
    <mx-column field="name" alignment="left" />
    <mx-column field="description" alignment="left" />

    <!-- columns -->

    <!-- filters -->
    <mx-grid-filter label="Id" field="id" />
    <mx-grid-filter label="Name" field="name" />
    <!-- filters -->

    <!-- actions -->
    <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class RoleListComponent {
  private router = inject(Router);

  add() {
    this.router.navigate(['/role/create']);
  }

  edit(e: any) {
    this.router.navigate(['/role/update/' + e.cellData.id]);
  }
}
