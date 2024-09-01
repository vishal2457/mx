import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControlPipe } from '../../pipe/form-control';
import { FormBaseComponent } from './base-form';
import { MxInputComponent } from './mx-input';
import { MxInputNumberComponent } from './mx-input-number';
import { MxButtonComponent } from '../button';

@Component({
  selector: 'mx-mini-counter',
  standalone: true,
  imports: [
    MxInputNumberComponent,
    MxInputComponent,
    FormControlPipe,
    MxButtonComponent,
  ],
  template: `<div class="flex flex-col gap-2">
    @if (label) {
      <label
        [for]="_id"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 capitalize"
      >
        {{ label }}
        @if (required) {
          <span class="text-red-600">*</span>
        }
      </label>
    }
    <div
      class="py-2 px-3 inline-block border rounded-lg "
      data-hs-input-number=""
    >
      <div class="flex items-center gap-x-1.5">
        <mx-button
          variant="secondary"
          (handleClick)="decrease()"
          aria-label="Decrease"
          size="xs"
        >
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
        </mx-button>
        <mx-input-number
          [control]="control()"
          inputClass="w-[50px] h-[25px] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          [max]="max()"
          [min]="min()"
        />
        <mx-button
          size="xs"
          variant="secondary"
          (click)="increase()"
          aria-label="Increase"
        >
          <svg
            class="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </mx-button>
      </div>
    </div>
    <div>
      <!-- End Input Number -->
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MxMiniCounterComponent extends FormBaseComponent {
  max = input(524288);
  min = input(0);

  increase() {
    const control = this.control();
    if (control.value === this.max()) {
      return;
    }
    control.setValue(control.value + 1);
  }

  decrease() {
    const control = this.control();
    if (control.value <= this.min()) {
      return;
    }
    control.setValue(control.value - 1);
  }
}
