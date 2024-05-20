import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  template: `<mx-grid-shell gridTitle="Users" apiURL="/user/list">
    <mx-toolbar icon="add" name="Add" (handleClick)="add()" />

    <!-- columns -->
    <mx-column field="id" alignment="left" />
    <mx-column field="name" alignment="left" />
    <mx-column field="email" alignment="left" />
    <mx-column field="active" alignment="left" />
    <!-- columns -->

    <!-- filters -->
    <mx-grid-filter label="Id" field="id" />
    <mx-grid-filter label="Name" field="name" />
    <mx-grid-filter label="Email" field="email" />
    <!-- filters -->

    <!-- actions -->
    <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class UserListComponent {
  private router = inject(Router);

  add() {
    this.router.navigate(['/user/create']);
  }

  edit(e: any) {
    this.router.navigate(['/user/update/' + e.cellData.id]);
  }
}
