import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBaseComponent } from './base-form';

@Component({
  selector: 'mx-label',
  standalone: true,
  template: ` @if(label) {
    <label
      [for]="_id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 capitalize"
    >
      {{ label }}
      @if(required) {
      <span class="text-red-600">*</span>
      }
    </label>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MxLabelComponent extends FormBaseComponent {}
