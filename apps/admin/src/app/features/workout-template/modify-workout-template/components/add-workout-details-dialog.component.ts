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

type Steps = '1' | '2';

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
    <!-- <div class="grid grid-cols-1 gap-4">
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
        [control]="workoutTemplateDetailform.controls.timeInM"
        [hints]="['Enter time in Minutes']"
      />
      <mx-input
        label="Additional instruction"
        [control]="workoutTemplateDetailform.controls.additionInstruction"
      />
    </div> -->

    <div>
      <ul class="relative flex flex-row gap-x-2">
        <li class="flex items-center gap-x-2 shrink basis-0 flex-1 group">
          <span
            class="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle"
          >
            <span
              class="size-7 flex justify-center items-center shrink-0  font-medium  rounded-full  bg-primary"
            >
              <span
                class="hs-stepper-success:hidden hs-stepper-completed:hidden"
                >1</span
              >
            </span>
            <span class="ms-2 text-sm font-medium "> Step </span>
          </span>
          <div
            class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-600 dark:hs-stepper-completed:bg-teal-600"
          ></div>
        </li>

        <li class="flex items-center gap-x-2 shrink basis-0 flex-1 group">
          <span
            class="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle"
          >
            <span
              class="size-7 flex justify-center items-center shrink-0  font-medium  rounded-full bg-secondary "
            >
              <span
                class="hs-stepper-success:hidden hs-stepper-completed:hidden"
                >2</span
              >
            </span>
            <span class="ms-2 text-sm font-medium"> Step </span>
          </span>
          <div
            class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-600 dark:hs-stepper-completed:bg-teal-600"
          ></div>
        </li>
      </ul>

      <div class="mt-5 sm:mt-8">
        <!-- First Contnet -->
        @if (activeStep === '1') {
          <div>
            <p>
              {{
                checked.size
                  ? checked.size + ' Selected'
                  : 'Please select an exercise'
              }}
            </p>
            <ul class="mt-3 flex flex-col h-64 overflow-y-auto">
              @for (
                exercise of data.exerciseData;
                track exercise.name;
                let index = $index
              ) {
                <li
                  class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
                >
                  <div class="flex items-center justify-between w-full">
                    <label [for]="exercise.name" class="cursor-pointer"
                      >{{ index + 1 }}.&nbsp;{{ exercise.name }}</label
                    >
                    <input
                      [id]="exercise.name"
                      class="border-gray-200 rounded disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      type="checkbox"
                      [checked]="checked.has(exercise.id)"
                      (change)="handleCheck($event, exercise)"
                    />
                  </div>
                </li>
              }
            </ul>
          </div>
        } @else if (activeStep === '2') {
          second step
        }
        <!-- End First Contnet -->

        <!-- Button Group -->
        <div class="mt-5 flex justify-between items-center gap-x-2">
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-stepper-back-btn=""
          >
            Back
          </button>
          <mx-button (handleClick)="changeStep('2')"> Next </mx-button>
        </div>
        <!-- End Button Group -->
      </div>
      <!-- End Stepper Content -->
    </div>
    <!-- End Stepper -->

    <!-- <mx-dialog-footer>
      <mx-button
        size="sm"
        (handleClick)="handleSubmit()"
        [disabled]="workoutTemplateDetailform.invalid"
        >Submit</mx-button
      >
    </mx-dialog-footer> -->
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
  protected checked = new Map();

  workoutTemplateDetailform = this.fb.group<
    ControlsOf<Omit<TWorkoutTemplateDetail, 'id' | 'workoutTemplateID' | 'day'>>
  >({
    exerciseID: new FormControl(null, [Validators.required]),
    set: new FormControl(null, [Validators.required]),
    reps: new FormControl(null, [Validators.required]),
    timeInM: new FormControl(null),
    restBwRepsInS: new FormControl(null, [Validators.required]),
    additionInstruction: new FormControl(''),
  });

  activeStep: Steps = '1';
  activatedSteps: string[] = ['1'];

  ngOnInit(): void {
    if (this.data.editMode) {
      this.workoutTemplateDetailform.patchValue(this.data.formValues);
    }
  }

  handleCheck(e: any, exercise: TExercise) {
    if (e?.target?.checked) {
      this.checked.set(exercise.id, exercise);
    } else {
      this.checked.delete(exercise.id);
    }
  }

  handleSubmit() {
    this.dialogRef.close({
      formValues: this.workoutTemplateDetailform.value,
      editMode: this.data.editMode,
    });
  }

  changeStep(step: Steps) {
    if (this.activatedSteps.includes(step)) {
      this.activeStep = step;
    }
    if (this.checked.size) {
      this.activatedSteps.push(step);
    }
  }
}
