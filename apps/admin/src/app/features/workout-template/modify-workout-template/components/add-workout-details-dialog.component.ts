import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TExercise,
  TWorkoutTemplateDetail,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import { SubSink } from '../../../../shared/utils/sub-sink';
import { matchSorter } from 'match-sorter';

type Steps = '1' | '2';

@Component({
  selector: 'add-workout-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<mx-dialog-content class="max-w-2xl">
    <mx-dialog-header>
      <mx-dialog-title>Add Exercises to workout template </mx-dialog-title>
      <mx-dialog-description
        >Press save after submitting to save your changes</mx-dialog-description
      >
      <mx-input label="Day Name" [control]="dayName" />
    </mx-dialog-header>
    <div>
      <ul class="relative flex flex-row gap-x-2 justify-center items-center">
        <li class="flex items-center gap-x-2 group">
          <span
            class="size-7 flex justify-center items-center shrink-0  font-medium  rounded-full"
            [ngClass]="{
              'bg-primary text-primary-foreground': activeStep === '1',
              'bg-secondary': activeStep !== '1',
            }"
          >
            <span>1</span>
          </span>
          <span class="ms-2 text-sm font-medium">Step</span>
          <div
            class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-600 dark:hs-stepper-completed:bg-teal-600"
          ></div>
        </li>
        <li>
          <span class="h-px flex-1 bg-gray-200 block size-20"></span>
        </li>
        <li class="flex items-center gap-x-2 group">
          <span
            class="size-7 flex justify-center items-center shrink-0  font-medium  rounded-full"
            [ngClass]="{
              'bg-primary text-primary-foreground': activeStep === '2',
              'bg-secondary': activeStep !== '2',
            }"
          >
            <span class="hs-stepper-success:hidden hs-stepper-completed:hidden"
              >2</span
            >
          </span>
          <span class="ms-2 text-sm font-medium"> Step </span>
          <div
            class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600 dark:bg-neutral-700 dark:hs-stepper-success:bg-blue-600 dark:hs-stepper-completed:bg-teal-600"
          ></div>
        </li>
      </ul>

      <div class="mt-5 sm:mt-8">
        <!-- First Contnet -->
        @if (activeStep === '1') {
          <div>
            <div class="flex justify-between items-center">
              <p>
                {{
                  checked.size
                    ? checked.size + ' Selected'
                    : 'Please select an exercise'
                }}
              </p>
              <mx-input
                [control]="searchControl"
                placeholder="Search exercise"
                inputClass="bg-background border"
                [clearable]="true"
                leftIcon="search"
              />
            </div>
            <ul class="mt-3 flex flex-col h-64 overflow-y-auto">
              @for (
                exercise of exerciseData;
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
          <div class=" h-64 overflow-y-auto">
            @for (
              form of workoutTemplateDetailform;
              track $index;
              let index = $index
            ) {
              <div class="my-4">
                <label class="font-semibold"
                  >{{ index + 1 }}.&nbsp;{{
                    form.controls._meta.value.name
                  }}</label
                >
                <div class="grid grid-cols-4 gap-2 mt-2">
                  <mx-mini-counter
                    label="Total sets"
                    [control]="form.controls.set"
                  />
                  <mx-input
                    label="Repetitions"
                    [control]="form.controls.reps"
                  />
                  <mx-input-number
                    label="Calorie Burn"
                    [control]="form.controls.approxCalorieBurn"
                  />
                  <mx-input-number
                    label="Rest bw reps"
                    [control]="form.controls.restBwRepsInS"
                  />
                </div>
                <div class="grid grid-cols-2  gap-2 mt-2">
                  <mx-input-number
                    label="Estimated time to complete"
                    [control]="form.controls.timeInM"
                  />
                  <mx-input
                    label="Additional instructions"
                    [control]="form.controls.additionInstruction"
                  />
                </div>
              </div>
            }
          </div>
        }
        <!-- End First Contnet -->

        <!-- Button Group -->
        <div class="mt-5 flex justify-between items-center gap-x-2">
          <mx-button
            (handleClick)="changeStep('1')"
            [disabled]="activeStep === '1'"
            variant="secondary"
          >
            Back
          </mx-button>
          <mx-button (handleClick)="changeStep('2')">
            {{ activeStep === '1' ? 'Next' : 'Submit' }}
          </mx-button>
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
      dayName: string;
      formValues: Partial<{
        exerciseID: number | null;
        set: number | null;
        reps: string | null;
        restBwRepsInS: number | null;
        timeInS: number | null;
        additionInstruction: string | null;
      }>[];
    }>,
    @Inject(DIALOG_DATA)
    protected data: {
      editMode: boolean;
      dayName: string;
      formValues: Array<
        Omit<TWorkoutTemplateDetail, 'id' | 'workoutTemplateID'> & {
          _meta: any;
        }
      >;
      exerciseData: TExercise[];
    },
  ) {}

  private fb = inject(FormBuilder);
  protected checked: Map<number, TExercise> = new Map();

  activeStep: Steps = '1';
  activatedSteps: string[] = ['1'];
  dayName = new FormControl(this.data.dayName, Validators.required);
  workoutTemplateDetailform: FormGroup<
    ControlsOf<
      Omit<
        TWorkoutTemplateDetail,
        'id' | 'workoutTemplateID' | 'day' | 'dayName'
      >
    > & { _meta: any }
  >[] = [];
  step2ValuesTemp: any[] = [];
  searchControl = new FormControl('');
  exerciseData: TExercise[] = [];

  private subs = new SubSink();

  ngOnInit(): void {
    this.exerciseData = this.data.exerciseData;
    this.subs.sink = this.searchControl.valueChanges.subscribe((value) => {
      if (!value) {
        this.exerciseData = this.data.exerciseData;
        return;
      }
      this.exerciseData = matchSorter(this.data.exerciseData, value, {
        keys: ['name'],
      });
    });
    if (this.data.editMode) {
      this.step2ValuesTemp = this.data.formValues;
      for (const exercise of this.data.formValues) {
        this.checked.set(exercise.exerciseID, exercise._meta);
      }
      this.exerciseData = this.moveSelectedItemsFirst(this.exerciseData);
    }
  }

  handleCheck(e: any, exercise: TExercise) {
    if (e?.target?.checked) {
      this.checked.set(exercise.id, exercise);
    } else {
      this.checked.delete(exercise.id);
    }
  }

  changeStep(step: Steps) {
    if (this.activeStep === '2' && step === '2') {
      if (this.formInvalid()) {
        alert('Fields invalid, Please fill all details');
        return;
      }
      this.handleSubmit();
    }
    if (this.checked.size) {
      this.activatedSteps.push(step);
    }
    if (this.activatedSteps.includes(step)) {
      this.activeStep = step;
    }

    if (step === '1') {
      this.step2ValuesTemp = this.getFormArrayValue();
      this.workoutTemplateDetailform = [];
    }

    if (step === '2') {
      this.step2Init();
    }
  }

  private handleSubmit() {
    this.dialogRef.close({
      formValues: this.getFormArrayValue(),
      editMode: this.data.editMode,
      dayName: this.dayName.value || '',
    });
  }

  private step2Init() {
    for (const [_, value] of this.checked) {
      const existing = this.step2ValuesTemp.find(
        (i) => i.exerciseID === value.id,
      );
      this.workoutTemplateDetailform.push(this.getFormGroup(value, existing));
    }
  }

  private getFormGroup(exercise: TExercise, existing?: any) {
    const form = this.fb.group<
      ControlsOf<
        Omit<
          TWorkoutTemplateDetail,
          'id' | 'workoutTemplateID' | 'day' | 'dayName'
        > & {
          _meta: any;
        }
      >
    >({
      exerciseID: new FormControl(exercise.id, [Validators.required]),
      set: new FormControl(3, [Validators.required]),
      reps: new FormControl('12,10,8', [Validators.required]),
      approxCalorieBurn: new FormControl(100, Validators.required),
      restBwRepsInS: new FormControl(30, [Validators.required]),
      timeInM: new FormControl(15),
      additionInstruction: new FormControl(''),
      _meta: new FormControl(exercise),
    });

    if (existing) {
      form.patchValue(existing);
    }
    return form;
  }

  private getFormArrayValue() {
    return this.workoutTemplateDetailform.map((form) => form.value);
  }

  private formInvalid() {
    return this.workoutTemplateDetailform.some((form) => form.invalid);
  }

  private moveSelectedItemsFirst(array: TExercise[]) {
    return array.sort((a, b) => {
      if (this.checked.has(a.id) && !this.checked.has(b.id)) {
        return -1;
      }
      if (!this.checked.has(a.id) && this.checked.has(b.id)) {
        return 1;
      }
      return 0;
    });
  }
}
