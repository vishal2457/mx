import { Component, computed, input, InputSignal } from '@angular/core';
import { MxIconComponent } from '../ui/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'display-currency',
  standalone: true,
  imports: [MxIconComponent, CurrencyPipe],
  template: ` <span class="flex">
    <p class="text-2xl font-bold">
      {{ formattedAmount() | currency: symbol() }}
    </p>
  </span>`,
})
export class DisplayCurrencyComponent {
  amount: InputSignal<number> = input.required();
  formattedAmount = computed(() => {
    return this.amount();
  });
  symbol: InputSignal<'INR'> = input('INR');
}
