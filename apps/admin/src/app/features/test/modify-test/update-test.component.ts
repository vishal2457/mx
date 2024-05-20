import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { TestFormComponent } from './test-form/test-form.component';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';
import { TTest } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'edit-test',
  template: ` <page-header
      header="Edit Test"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <test-form />`,
})
export class UpdateTestComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(TestFormComponent) testFormComponent!: TestFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  testID!: string;
  testForm!: FormGroup;
  private requests = new SubSink()

  ngOnInit(): void {
    this.testID = this.route.snapshot.params['id'];
    this.fetchTestDetails( this.testID)
  }

  ngAfterViewInit(): void {
    this.testForm = this.testFormComponent.testForm;
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchTestDetails(id: string) {
    this.api.get<TTest>(`/test/${id}`).subscribe(({ data }) => {
       this.testForm.patchValue(data);
    });
  }

    handleSubmit() {
    if (this.testForm.invalid) {
      this.testFormComponent.showErrors = true;
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Test',
      id: 'update-test',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(`/test/${this.testID}`, this.testForm.value)
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Test updated',
            id: 'update-test',
            type: 'success',
          });
          this.router.navigate(['/test/list']);
        },
      });
  }

}
