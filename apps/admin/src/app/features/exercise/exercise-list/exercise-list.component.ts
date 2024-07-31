import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exercise-list',
  template: ` <page-header header="Exercise" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Exercise</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell
      gridTitle="Exercises"
      apiURL="/exercise/list"
      [defaultSort]="{ Asc: 'name' }"
    >
      <!-- columns -->
      <mx-column field="id" [visible]="false" />
      <mx-column field="name" alignment="left" />
      <mx-column field="description" alignment="left" />
      <mx-column field="level" alignment="left" />
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="Name" field="name" />
      <mx-grid-filter label="Description" field="description" />
      <mx-grid-filter label="Level" field="level" />
      <mx-grid-filter label="Reference Url" field="referenceURL" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class ExerciseListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/exercise/create']);
  }

  edit(e: any) {
    this.router.navigate(['/exercise/update/' + e.cellData.id]);
  }
}
