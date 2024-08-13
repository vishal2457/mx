import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  template: ` <page-header header="Roles" [showCancel]="false">
      <mx-button (handleClick)="add()">
        <span class="flex items-center">
          <p>Add Role</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Manage Roles" apiURL="/role/list">
      <!-- columns -->
      <mx-column field="id" alignment="left" [visible]="false" />
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
