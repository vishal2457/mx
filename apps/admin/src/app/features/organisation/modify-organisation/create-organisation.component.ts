import {
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-organisation',
  template: `<page-header header="Add Organisation">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <organisation-form />`,
})
export class CreateOrganisationComponent implements OnDestroy {
  @ViewChild(OrganisationFormComponent) OrganisationFormComponent!: OrganisationFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.OrganisationFormComponent.isInValid()) {
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Organisation',
      id: 'add-organisation',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/organisation/create', this.OrganisationFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.OrganisationFormComponent.reset();
          this.notif.updateToast({
            text: 'Organisation added',
            id: 'add-organisation',
            type: 'success',
          });
        },
      });
  }
}
