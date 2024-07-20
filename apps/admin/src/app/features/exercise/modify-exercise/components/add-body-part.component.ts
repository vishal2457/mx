import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TBodyPart } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { ApiService } from '../../../../shared/services/api.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'add-body-part',
  template: `
    <mx-dialog-content>
      <mx-dialog-header>
        <mx-dialog-title>Add body part</mx-dialog-title>
        <mx-dialog-description>Add new body part</mx-dialog-description>
      </mx-dialog-header>
      <div class="grid grid-cols-1 gap-4">
        <mx-input label="Name" [control]="formControls.name" />
        <mx-input label="Description" [control]="formControls.description" />
      </div>

      <mx-dialog-footer>
        <mx-button
          size="sm"
          (handleClick)="handleSubmit()"
          [disabled]="bodyPartForm.invalid"
          >Save</mx-button
        >
      </mx-dialog-footer>
    </mx-dialog-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBodyPartComponent {
  constructor(private dialogRef: DialogRef<{ refresh: boolean }>) {}

  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  bodyPartForm = this.fb.group<ControlsOf<Omit<TBodyPart, 'id'>>>({
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.bodyPartForm.controls;
  }

  handleSubmit() {
    this.api
      .post('/body-part/create', this.bodyPartForm.value)
      .subscribe(() => {
        this.dialogRef.close({ refresh: true });
      });
  }
}
