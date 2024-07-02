import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBaseComponent } from './base-form';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormControlPipe } from '../../pipe/form-control';
import { NgClass } from '@angular/common';
import { MxHintComponent } from '../hint';
import { MxIconComponent } from '../icon';
import { mergetw } from '../../utils/tw-merge';
import { MxSvgIconComponent } from '../svg-icon';
import { MxCardModule } from '../card/card.module';
import { SubSink } from '../../utils/sub-sink';

@Component({
  selector: 'mx-input-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    NgClass,
    MxHintComponent,
    MxIconComponent,
    MxSvgIconComponent,
    MxCardModule,
  ],
  template: `<div class="relative">
    @if (isPasswordFocused) {
    <div mxCard class="my-4 p-4 absolute bottom-14 shadow-lg z-[102]">
      <h2 class="mb-2 text-md font-semibold">Password requirements:</h2>
      <ul class="max-w-md space-y-1">
        <li class="flex items-center text-sm">
          <svg
            class="w-3.5 h-3.5 me-2  flex-shrink-0"
            [ngClass]="
              passwordValidations.length
                ? 'text-green-500 dark:text-green-500'
                : 'text-gray-500 dark:text-gray-400'
            "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          At least 10 characters
        </li>
        <li class="flex items-center text-sm">
          <svg
            class="w-3.5 h-3.5 me-2  flex-shrink-0"
            [ngClass]="
              passwordValidations.lowercase
                ? 'text-green-500 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
            "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          At least one lowercase character
        </li>
        <li class="flex items-center text-sm">
          <svg
            class="w-3.5 h-3.5 me-2  flex-shrink-0"
            [ngClass]="
              passwordValidations.number
                ? 'text-green-500 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
            "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          At least one number
        </li>
        <li class="flex items-center text-sm">
          <svg
            class="w-3.5 h-3.5 me-2  flex-shrink-0"
            [ngClass]="
              passwordValidations.special
                ? 'text-green-500 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
            "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          Inclusion of at least one special character, e.g ! # ?
        </li>
      </ul>
    </div>
    } @if(label) {
    <label
      [for]="_id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 capitalize"
    >
      {{ label }}
      @if(required) {
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
        autocomplete="new-password"
        [id]="_id"
        [ngClass]="_inputClass"
        [type]="type"
        [placeholder]="placeholder"
        [formControl]="control | formControl"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
      >
        @if (type === 'password') {
        <mx-svg-icon iconName="open-eye" (handleClick)="type = 'text'" />
        } @else {
        <mx-svg-icon iconName="hide-eye" (handleClick)="type = 'password'" />
        }
      </span>
    </div>
    @if(showErrors && errors?.['required']) {
    <mx-hint message="This is a required field" type="error" heading="ERROR" />
    }
    <!-- comment to restrict prettier -->
    @for(hint of hints; track hint) {
    <mx-hint [message]="hint" />
    } @if (suggestPassword) {
    <mx-hint
      message="suggest password"
      type="link"
      (click)="generatePassword()"
      position="end"
    />
    }
  </div>`,
})
export class MxInputPasswordComponent
  extends FormBaseComponent
  implements OnInit, OnDestroy
{
  @Input() type: 'password' | 'text' = 'password';
  @Input() suggestPassword = false;
  @Input() inputClass = '';
  protected get _inputClass() {
    if (this.leftIcon) {
      return mergetw(this.inputClass, 'pl-8');
    }

    return this.inputClass;
  }
  @Input() leftIcon = '';
  @Input() iconClass = '';

  private subs = new SubSink();

  protected passwordValidations = {
    length: false,
    lowercase: false,
    special: false,
    number: false,
  };
  protected isPasswordFocused = false;

  ngOnInit(): void {
    this.control.addValidators(this.passwordValidator.bind(this));

    this.subs.sink = this.control.valueChanges.subscribe((value) => {
      this.validatePassword(value);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  protected onFocus() {
    this.isPasswordFocused = true;
  }

  protected onBlur() {
    this.isPasswordFocused = false;
  }

  protected generatePassword() {
    const length = 11;
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%&-_.';

    if (length < 10) {
      throw new Error('Password length must be greater than 10 characters.');
    }

    let password = '';
    password +=
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password +=
      upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password length with random characters from all sets
    const allChars = lowerCaseChars + upperCaseChars + numbers + specialChars;
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    this.control.setValue(password);
  }

  private validatePassword(password: string) {
    this.passwordValidations = {
      length: password.length >= 10 && password.length <= 100,
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: Boolean(/[^A-Za-z0-9]/.test(password)),
    };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    this.validatePassword(value);

    const allValid = Object.keys(this.passwordValidations).every(
      (key) => this.passwordValidations[key]
    );

    return allValid ? null : { passwordStrength: true };
  }
}
