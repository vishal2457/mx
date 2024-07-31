import { Component, computed, input, InputSignal } from '@angular/core';
import { MxIconComponent } from '../ui/icon';
import { CurrencyPipe } from '@angular/common';
import { mergetw } from '../utils/tw-merge';

@Component({
  selector: 'display-currency',
  standalone: true,
  imports: [MxIconComponent, CurrencyPipe],
  template: ` <span class="flex">
    <p [class]="_class()">
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
  class = input('');
  protected _class = computed(() => {
    return mergetw('text-2xl font-bold', this.class());
  });
}
