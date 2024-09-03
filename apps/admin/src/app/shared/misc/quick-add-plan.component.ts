import { Component, Inject, inject, OnInit } from '@angular/core';
import { MxDialogModule } from '../ui/dialog/dialog.module';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MxButtonComponent } from '../ui/button';
import { MxInputComponent } from '../ui/form/mx-input';
import { MxInputNumberComponent } from '../ui/form/mx-input-number';
import { ApiService } from '../services/api.service';
import { MxNotification } from '../ui/notification/notification.service';
import { TPlan } from '../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../utils/form-controls-of';
import { SubSink } from '../utils/sub-sink';

@Component({
  selector: 'quick-add-plan',
  standalone: true,
  imports: [
    MxDialogModule,
    ReactiveFormsModule,
    MxButtonComponent,
    MxInputComponent,
    MxInputNumberComponent,
  ],
  template: ` <mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title>Add new plan</mx-dialog-title>
      <mx-dialog-description
        >Quick add new plans while adding members</mx-dialog-description
      >
    </mx-dialog-header>
    <div class="grid grid-cols-1 gap-4">
      <mx-input [control]="planForm.controls.name" label="Name" />
      <mx-input-number [control]="planForm.controls.amount" label="Amount" />
      <mx-input-number
        [control]="planForm.controls.periodInMonths"
        label="Period in months"
        [hints]="periodInMonthHint"
      />
    </div>
    <mx-dialog-footer>
      <mx-button
        size="sm"
        (handleClick)="handlePlanAdd()"
        [disabled]="planForm.invalid"
        >Save</mx-button
      >
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class QuickAddPlanComponent implements OnInit {
  constructor(
    @Inject(DIALOG_DATA) private data: { payload: TPlan },
    private dialogRef: DialogRef<{ success: boolean }>,
  ) {}

  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private dialog = inject(Dialog);
  private toast = inject(MxNotification);

  periodInMonthHint: string[] = [];

  planForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TPlan, 'id' | 'createdAt' | 'updatedAt'>>
  >({
    name: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    periodInMonths: new FormControl(null, Validators.required),
  });

  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink =
      this.planForm.controls.periodInMonths.valueChanges.subscribe((value) => {
        if (!value) {
          this.periodInMonthHint = [];
          return;
        }
        const converted = this.convertMonthsToYears(value);
        this.periodInMonthHint = [
          `${converted.years} year, ${converted.months} month`,
        ];
      });

    if (this.data?.payload) {
      this.planForm.patchValue(this.data.payload);
    }
  }

  openPlanForm(ref) {
    this.dialog.open(ref);
  }

  closePlanForm() {
    // handle close
  }

  handlePlanAdd() {
    if (this.planForm.invalid) {
      return;
    }
    let req = this.api.post('/plan/create', this.planForm.value);

    if (this.data.payload) {
      req = this.api.put(
        `/plan/update/${this.data.payload.id}`,
        this.planForm.value,
      );
    }
    req.subscribe(() => {
      this.planForm.reset();
      this.closePlanForm();
      this.toast.show({
        text: 'Plan Added',
        type: 'success',
      });
      this.dialogRef.close({ success: true });
    });
  }

  private convertMonthsToYears(months: number) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return { years, months: remainingMonths };
  }
}
