import { JsonPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  input,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from '../../pipe/form-control';
import { mergetw } from '../../utils/tw-merge';
import { MxHintComponent } from '../hint';
import { MxIconComponent } from '../icon';
import { FormBaseComponent } from './base-form';
import { MxFormErrorComponent } from './form-error';
import { SubSink } from '../../utils/sub-sink';
import { safeParseInt } from '../../utils/safe-parse-int';

@Component({
  selector: 'mx-input-number',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    NgClass,
    MxHintComponent,
    MxIconComponent,
    MxFormErrorComponent,
    JsonPipe,
  ],
  template: `<div>
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
    <div class="relative">
      @if (leftIcon) {
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 pt-1">
          <mx-icon [icon]="leftIcon" [iconClass]="iconClass" />
        </span>
      }
      <input
        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        autocomplete="off"
        [id]="_id"
        [ngClass]="_inputClass()"
        type="number"
        [placeholder]="placeholder"
        [formControl]="control() | formControl"
        [maxlength]="maxlength"
        [minlength]="minlength"
      />
      @if (rightIcon && !clearable) {
        <span class="absolute inset-y-0 right-0 flex items-center pr-3">
          <mx-icon [icon]="rightIcon" [iconClass]="iconClass" />
        </span>
      }
      @if (clearable && control().value) {
        <span class="absolute inset-y-0 right-0 flex items-center pr-3">
          <mx-icon
            icon="close"
            [iconClass]="_iconClass()"
            (click)="handleClear()"
          />
        </span>
      }
    </div>

    <mx-form-error
      [errors]="control().errors"
      [showError]="control().touched || control().dirty"
    />

    <!-- comment to restrict prettier -->
    @for (hint of hints; track hint) {
      <mx-hint [message]="hint" />
    }
  </div>`,
})
export class MxInputNumberComponent
  extends FormBaseComponent
  implements OnInit, OnDestroy
{
  @Input() maxlength = 524288;
  @Input() minlength = 0;
  @Input() rightIcon = '';
  @Input() leftIcon = '';
  @Input() clearable = false;

  float = input(false);
  iconClass = input('');
  inputClass = input('');

  private subs = new SubSink();

  protected _iconClass = computed(() => {
    if (this.clearable) {
      return mergetw(this.iconClass(), 'cursor-pointer');
    }
    return this.iconClass();
  });

  protected _inputClass = computed(() => {
    if (this.leftIcon) {
      return mergetw(this.inputClass(), 'pl-8');
    }
    if (this.rightIcon || this.clearable) {
      return mergetw(this.inputClass(), 'pr-8');
    }
    return this.inputClass();
  });

  ngOnInit(): void {
    const control = this.control();
    this.subs.sink = control.valueChanges.subscribe((value) => {
      if (!value) {
        return;
      }
      control.patchValue(this.formatValue(value), { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  protected handleClear() {
    this.control().reset();
  }

  private formatValue(value: string) {
    if (this.float()) {
      return parseFloat(value);
    }
    return safeParseInt(value);
  }
}
