import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'workout-template-list',
  template: ` <page-header
      header="Manage Workout Templates"
      [showCancel]="false"
    >
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Workout Template</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell
      gridTitle="Workout Templates"
      apiURL="/workout-template/list"
    >
      <!-- columns -->
      <mx-column field="id" />
      <mx-column field="name" />
      <mx-column field="description" />
      <mx-column field="target" />
      <mx-column field="intensity" />
      <mx-column field="approxTimeToCompleteInM" title="Time To complete (M)" />
      <mx-column field="active">
        <ng-template #cell let-item>
          <mx-badge
            [text]="item.active ? 'Yes' : 'No'"
            [variant]="item.active ? 'success' : 'error'"
          />
        </ng-template>
      </mx-column>
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="Name" field="name" />
      <mx-grid-filter label="Description" field="description" />
      <mx-grid-filter label="Target" field="target" />
      <mx-grid-filter label="Intensity" field="intensity" />
      <mx-grid-filter
        label="ApproxTimeToCompleteInM"
        field="approxTimeToCompleteInM"
      />
      <mx-grid-filter label="Active" field="active" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" text="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class WorkoutTemplateListComponent {
  private router = inject(Router);

  create() {
    this.router.navigate(['/workout-template/create']);
  }

  edit(e: any) {
    this.router.navigate(['/workout-template/update/' + e.cellData.id]);
  }
}
