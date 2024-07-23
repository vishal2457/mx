import {
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-enquiry',
  template: `<page-header header="Add Enquiry">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <enquiry-form />`,
})
export class CreateEnquiryComponent implements OnDestroy {
  @ViewChild(EnquiryFormComponent) EnquiryFormComponent!: EnquiryFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.EnquiryFormComponent.isInValid()) {
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Enquiry',
      id: 'add-enquiry',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/enquiry/create', this.EnquiryFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.EnquiryFormComponent.reset();
          this.notif.updateToast({
            text: 'Enquiry added',
            id: 'add-enquiry',
            type: 'success',
          });
        },
      });
  }
}
