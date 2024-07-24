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
  template: ` <div
      class="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
      data-hs-input-number=""
    >
      <div class="flex items-center gap-x-1.5">
        <mx-button
          (handleClick)="decrease()"
          tabindex="-1"
          aria-label="Decrease"
          size="sm"
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
          type="number"
        />
        <mx-button (click)="increase()" tabindex="-1" aria-label="Increase">
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
    <!-- End Input Number -->`,
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
    if (control.value === this.min()) {
      return;
    }
    control.setValue(control.value - 1);
  }
}
