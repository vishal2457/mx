import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TEnquiry } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-enquiry',
  template: ` <page-header header="Edit Enquiry">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <enquiry-form />`,
})
export class UpdateEnquiryComponent implements OnInit, OnDestroy {
  @ViewChild(EnquiryFormComponent) enquiryFormComponent!: EnquiryFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  enquiryID!: string;
  private requests = new SubSink()

  ngOnInit(): void {
    this.enquiryID = this.route.snapshot.params['id'];
    this.fetchEnquiryDetails( this.enquiryID)
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchEnquiryDetails(id: string) {
    this.api.get<TEnquiry>(`/enquiry/detail/${id}`).subscribe(({ data }) => {
       this.enquiryFormComponent.patchValue(data);
    });
  }

    handleSubmit() {
    if (this.enquiryFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Enquiry',
      id: 'update-enquiry',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/enquiry/update/${this.enquiryID}`, this.enquiryFormComponent.getFormValue())
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
