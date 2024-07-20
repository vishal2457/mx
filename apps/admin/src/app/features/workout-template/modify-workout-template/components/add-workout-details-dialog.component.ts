import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TExercise,
  TWorkoutTemplateDetail,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'add-workout-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title>Add Exercises to workout template </mx-dialog-title>
      <mx-dialog-description
        >Press save after submitting to save your changes</mx-dialog-description
      >
    </mx-dialog-header>
    <div class="grid grid-cols-1 gap-4">
      <mx-select
        label="Exercise"
        [items]="data.exerciseData"
        bindLabel="name"
        bindValue="id"
        [control]="workoutTemplateDetailform.controls.exerciseID"
      />
      <mx-input-number
        label="Total Sets"
        [control]="workoutTemplateDetailform.controls.set"
      />
      <mx-input
        label="Repetition"
        [control]="workoutTemplateDetailform.controls.reps"
        [hints]="['Enter reps in comma seperated form, eg: 12,10,8']"
      />
      <mx-input
        label="Rest between reps"
        [control]="workoutTemplateDetailform.controls.restBwRepsInS"
        [hints]="['Enter time in seconds']"
      />
      <mx-input
        label="Estimated time to complete"
        [control]="workoutTemplateDetailform.controls.timeInS"
        [hints]="['Enter time in seconds']"
      />
      <mx-input
        label="Additional instruction"
        [control]="workoutTemplateDetailform.controls.additionInstruction"
      />
    </div>

    <mx-dialog-footer>
      <mx-button
        size="sm"
        (handleClick)="handleSubmit()"
        [disabled]="workoutTemplateDetailform.invalid"
        >Submit</mx-button
      >
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class AddWorkoutDetailComponent implements OnInit {
  constructor(
    private dialogRef: DialogRef<{
      editMode: boolean;
      formValues: Partial<{
        exerciseID: number | null;
        set: number | null;
        reps: string | null;
        restBwRepsInS: string | null;
        timeInS: string | null;
        additionInstruction: string | null;
      }>;
    }>,
    @Inject(DIALOG_DATA)
    protected data: {
      editMode: boolean;
      formValues: Omit<TWorkoutTemplateDetail, 'id' | 'workoutTemplateID'>;
      exerciseData: TExercise[];
    },
  ) {}

  private fb = inject(FormBuilder);

  workoutTemplateDetailform = this.fb.group<
    ControlsOf<Omit<TWorkoutTemplateDetail, 'id' | 'workoutTemplateID'>>
  >({
    exerciseID: new FormControl(null, [Validators.required]),
    set: new FormControl(null, [Validators.required]),
    reps: new FormControl(null, [Validators.required]),
    timeInS: new FormControl(null),
    restBwRepsInS: new FormControl(null, [Validators.required]),
    additionInstruction: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.data.editMode) {
      this.workoutTemplateDetailform.patchValue(this.data.formValues);
    }
  }

  handleSubmit() {
    this.dialogRef.close({
      formValues: this.workoutTemplateDetailform.value,
      editMode: this.data.editMode,
    });
  }
}
