import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TOrganisation } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-organisation',
  template: ` <page-header header="Edit Organisation">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <organisation-form />`,
})
export class UpdateOrganisationComponent implements OnInit, OnDestroy {
  @ViewChild(OrganisationFormComponent) organisationFormComponent!: OrganisationFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  organisationID!: string;
  private requests = new SubSink()

  ngOnInit(): void {
    this.organisationID = this.route.snapshot.params['id'];
    this.fetchOrganisationDetails( this.organisationID)
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchOrganisationDetails(id: string) {
    this.api.get<TOrganisation>(`/organisation/${id}`).subscribe(({ data }) => {
       this.organisationFormComponent.patchValue(data);
    });
  }

    handleSubmit() {
    if (this.organisationFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Organisation',
      id: 'update-organisation',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/organisation/update/${this.organisationID}`, this.organisationFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Organisation updated',
            id: 'update-organisation',
            type: 'success',
          });
          this.router.navigate(['/organisation/list']);
        },
      });
  }

}
