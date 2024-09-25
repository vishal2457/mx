import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { EventFormComponent } from './event-form/event-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-event',
  template: `<page-header header="Add Event">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <event-form />`,
})
export class CreateEventComponent implements OnDestroy {
  @ViewChild(EventFormComponent) EventFormComponent!: EventFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.EventFormComponent.isInValid()) {
      this.EventFormComponent.markAllAsTouched();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Event',
      id: 'add-event',
      type: 'loading',
    });

    const formData = new FormData();
    const formValue = this.EventFormComponent.getFormValue();

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    this.addRequests.sink = this.api
      .post('/event/create', this.EventFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.EventFormComponent.reset();
          this.notif.updateToast({
            text: 'Event added',
            id: 'add-event',
            type: 'success',
          });
        },
      });
  }
}
