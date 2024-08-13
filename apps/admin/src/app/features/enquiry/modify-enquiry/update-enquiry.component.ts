import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TEnquiry,
  TEnquiryStatusHistory,
  TUser,
} from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';

@Component({
  selector: 'edit-enquiry',
  template: `
    <page-header header="Edit Enquiry">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <enquiry-form />
    <div class="my-4"></div>
    <mx-data-grid [data]="enquiryStatusHistory" gridTitle="Status History">
      <mx-column field="user.name" title="User" />
      <mx-column field="enquiryStatusHistory.status" title="Previous Status">
        <ng-template #cell let-item>
          <mx-badge
            [text]="item.enquiryStatusHistory.status"
            [variant]="
              item.enquiryStatusHistory.status === 'Open' ? 'info' : 'secondary'
            "
          />
        </ng-template>
      </mx-column>
      <mx-column field="enquiryStatusHistory.createdAt" title="Created">
        <ng-template #cell let-item>
          {{ item.enquiryStatusHistory.createdAt | date: 'medium' }}
        </ng-template>
      </mx-column>
    </mx-data-grid>
  `,
})
export class UpdateEnquiryComponent implements OnInit, OnDestroy {
  @ViewChild(EnquiryFormComponent) enquiryFormComponent!: EnquiryFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  enquiryID!: string;
  enquiryStatusHistory: {
    enquiryStatusHistory: TEnquiryStatusHistory;
    user: TUser;
  }[] = [];
  private requests = new SubSink();

  ngOnInit(): void {
    this.enquiryID = this.route.snapshot.params['id'];
    this.fetchEnquiryDetails(this.enquiryID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchEnquiryDetails(id: string) {
    this.api
      .get<{
        detail: TEnquiry;
        enquiryStatusHistory: {
          enquiryStatusHistory: TEnquiryStatusHistory;
          user: TUser;
        }[];
      }>(`/enquiry/detail/${id}`)
      .subscribe(({ data }) => {
        this.enquiryFormComponent.patchValue(data.detail);
        this.enquiryStatusHistory = data.enquiryStatusHistory;
      });
  }

  handleSubmit() {
    if (this.enquiryFormComponent.isInValid()) {
      this.enquiryFormComponent.markAllAsTouched();
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Enquiry',
      id: 'update-enquiry',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/enquiry/update/${this.enquiryID}`,
        this.enquiryFormComponent.getFormValue(),
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Enquiry updated',
            id: 'update-enquiry',
            type: 'success',
          });
          this.router.navigate(['/enquiry/list']);
        },
      });
  }
}
