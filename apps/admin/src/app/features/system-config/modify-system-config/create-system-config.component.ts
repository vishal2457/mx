import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { SystemConfigFormComponent } from './system-config-form/system-config-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-systemConfig',
  template: `<page-header header="System Config">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <systemConfig-form />`,
})
export class CreateSystemConfigComponent implements OnDestroy {
  @ViewChild(SystemConfigFormComponent)
  SystemConfigFormComponent!: SystemConfigFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.SystemConfigFormComponent.isInValid()) {
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding SystemConfig',
      id: 'add-systemConfig',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post(
        '/systemConfig/create',
        this.SystemConfigFormComponent.getFormValue(),
      )
      .subscribe({
        next: () => {
          this.SystemConfigFormComponent.reset();
          this.notif.updateToast({
            text: 'SystemConfig added',
            id: 'add-systemConfig',
            type: 'success',
          });
        },
      });
  }
}
