import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'organisation-list',
  template: `
  <page-header header="Organisation" [showCancel]="false">
      <mx-button  (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Organisation</p>
        </span>
      </mx-button>
    </page-header>
  <mx-grid-shell gridTitle="Organisations" apiURL="/organisation/list">
    <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="name" alignment="left" />
      <mx-column field="email" alignment="left" />
      <mx-column field="emailVerified" alignment="left" />
      <mx-column field="active" alignment="left" />
      <mx-column field="mobile" alignment="left" />
      <mx-column field="createdAt" alignment="left" />
      <mx-column field="updatedAt" alignment="left" />
    <!-- columns -->

    <!-- filters -->
      <mx-grid-filter label="Id" field="id"  />
      <mx-grid-filter label="Name" field="name"  />
      <mx-grid-filter label="Email" field="email"  />
      <mx-grid-filter label="EmailVerified" field="emailVerified"  />
      <mx-grid-filter label="Active" field="active"  />
      <mx-grid-filter label="Mobile" field="mobile"  />
      <mx-grid-filter label="CreatedAt" field="createdAt"  />
      <mx-grid-filter label="UpdatedAt" field="updatedAt"  />
    <!-- filters -->

    <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class OrganisationListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/organisation/create']);
  }

  edit(e: any) {
    this.router.navigate(['/organisation/update/' + e.cellData.id]);
  }
}
