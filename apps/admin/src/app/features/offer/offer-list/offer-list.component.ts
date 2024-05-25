import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-list',
  template: `<mx-grid-shell gridTitle="Offers" apiURL="/offer/list">

      <mx-toolbar icon="add" name="Add" (handleClick)="add()" />

    <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="name" alignment="left" />
      <mx-column field="amount" alignment="left" />
      <mx-column field="period" alignment="left" />
    <!-- columns -->

    <!-- filters -->
      <mx-grid-filter label="Id" field="id"  />
      <mx-grid-filter label="Name" field="name"  />
      <mx-grid-filter label="Amount" field="amount"  />
      <mx-grid-filter label="Period" field="period"  />
    <!-- filters -->

    <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <!-- actions -->
  </mx-grid-shell>`,
})
export class OfferListComponent {
  private router = inject(Router);

  add() {
    this.router.navigate(['/offer/create']);
  }

  edit(e: any) {
    this.router.navigate(['/offer/update/' + e.cellData.id]);
  }
}
