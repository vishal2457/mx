import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SystemConfigFormComponent } from './system-config-form/system-config-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TSystemConfig } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-systemConfig',
  template: ` <page-header header="Edit SystemConfig">
      <mx-button  (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <systemConfig-form />`,
})
export class UpdateSystemConfigComponent implements OnInit, OnDestroy {
  @ViewChild(SystemConfigFormComponent) systemConfigFormComponent!: SystemConfigFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  systemConfigID!: string;
  private requests = new SubSink()

  ngOnInit(): void {
    this.systemConfigID = this.route.snapshot.params['id'];
    this.fetchSystemConfigDetails( this.systemConfigID)
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchSystemConfigDetails(id: string) {
    this.api.get<TSystemConfig>(`/systemConfig/${id}`).subscribe(({ data }) => {
       this.systemConfigFormComponent.patchValue(data);
    });
  }

    handleSubmit() {
    if (this.systemConfigFormComponent.isInValid()) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating SystemConfig',
      id: 'update-systemConfig',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/systemConfig/update/${this.systemConfigID}`, this.systemConfigFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'SystemConfig updated',
            id: 'update-systemConfig',
            type: 'success',
          });
          this.router.navigate(['/systemConfig/list']);
        },
      });
  }

}
