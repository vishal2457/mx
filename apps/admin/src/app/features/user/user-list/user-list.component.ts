import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `<mx-grid-shell gridTitle="Customers" apiURL="/user/list">

      <mx-toolbar icon="add" name="Add" (handleClick)="add()" />

    <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="name" alignment="left" />
      <mx-column field="email" alignment="left" />
      <mx-column field="password" alignment="left" />
      <mx-column field="active" alignment="left" />
      <mx-column field="createdAt" alignment="left" />
      <mx-column field="udpatedAt" alignment="left" />
    <!-- columns -->

    <!-- filters -->
      <mx-grid-filter label="Id" field="id"  />
      <mx-grid-filter label="Name" field="name"  />
      <mx-grid-filter label="Email" field="email"  />
      <mx-grid-filter label="Password" field="password"  />
      <mx-grid-filter label="Active" field="active"  />
      <mx-grid-filter label="CreatedAt" field="createdAt"  />
      <mx-grid-filter label="UdpatedAt" field="udpatedAt"  />
    <!-- filters -->

    <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class UserListComponent {

  add() {
    this.router.navigate(['/user/create']);
  }

  edit(e: any) {
    this.router.navigate(['/user/update/' + e.cellData.id]);
  }
}
