import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { UserService } from '../../../shared/services/user-data.service';
import { TOrganisation } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'add-organisation',
  template: `<page-header header="Organisation Settings">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <organisation-form />
    <mx-image [filename]="organisation.logo" /> `,
})
export class CreateOrganisationComponent implements OnDestroy, OnInit {
  @ViewChild(OrganisationFormComponent)
  OrganisationFormComponent!: OrganisationFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private userService = inject(UserService);

  private addRequests = new SubSink();
  private subs = new SubSink();
  organisation!: TOrganisation;

  ngOnInit(): void {
    this.subs.sink = this.userService.organisation$.subscribe((data) => {
      if (!data) {
        return;
      }

      this.organisation = data;
      this.fetchOrganisationID();
    });
  }

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  fetchOrganisationID() {
    this.api
      .get(`/organisation/detail/${this.organisation.id}`)
      .subscribe((data) => {
        this.OrganisationFormComponent.patchValue(data.data);
      });
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

    const formData = new FormData();
    const formValue = this.OrganisationFormComponent.getFormValue();

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    let request;
    if (this.organisation.id) {
      request = this.api.put(
        `/organisation/update/${this.organisation.id}`,
        formData,
      );
    } else {
      request = this.api.post('/organisation/create', formData);
    }

    this.addRequests.sink = request.subscribe({
      next: () => {
        this.notif.updateToast({
          text: 'Organisation data Updated',
          id: 'add-organisation',
          type: 'success',
        });
        window.location.reload();
      },
    });
  }
}
