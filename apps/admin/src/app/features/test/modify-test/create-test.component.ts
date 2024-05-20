import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { TestFormComponent } from './test-form/test-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'add-test',
  template: `<page-header
      header="Add Test"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <test-form />`,
})
export class CreateTestComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TestFormComponent) TestFormComponent!: TestFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  testForm!: FormGroup;
  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  ngAfterViewInit(): void {
    this.testForm = this.TestFormComponent.testForm;
  }

  handleSubmit() {
    if (this.testForm.invalid) {
      this.TestFormComponent.showErrors = true;
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Test',
      id: 'add-test',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/test', this.testForm.value)
      .subscribe({
        next: () => {
          this.testForm.reset();
          this.notif.updateToast({
            text: 'Test added',
            id: 'add-test',
            type: 'success',
          });
        },
      });
  }
}
