import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TEvent } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
  selector: 'edit-event',
  template: ` <page-header header="Edit Event">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <event-form />`,
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  eventID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.eventID = this.route.snapshot.params['id'];
    this.fetchEventDetails(this.eventID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchEventDetails(id: string) {
    this.api.get<TEvent>(`/event/detail/${id}`).subscribe(({ data }) => {
      this.eventFormComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.eventFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Event',
      id: 'update-event',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/event/update/${this.eventID}`,
        this.eventFormComponent.getFormValue(),
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Event updated',
            id: 'update-event',
            type: 'success',
          });
          this.router.navigate(['/event/list']);
        },
      });
  }
}
