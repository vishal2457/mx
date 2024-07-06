import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from '@angular/core';
import { MxHintComponent } from '../hint';

@Component({
  selector: 'mx-form-error',
  standalone: true,
  imports: [MxHintComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showError()) {
      @for (error of errorsList(); track error) {
        <mx-hint type="error" [message]="error" />
      }
    }
  `,
})
export class MxFormErrorComponent {
  errors: InputSignal<object | null> = input.required({});
  showError = input(false);

  errorsList = computed(() => {
    const errors = this.errors();
    if (!errors) {
      return [];
    }

    const errorsList: string[] = [];
    for (const errorName in errors) {
      switch (errorName) {
        case 'required':
          errorsList.push('This field is required.');
          break;
        case 'minlength':
          errorsList.push(
            `Minimum length is ${errors[errorName].requiredLength} characters.`,
          );
          break;
        case 'maxlength':
          errorsList.push(
            `Maximum length is ${errors[errorName].requiredLength} characters.`,
          );
          break;
        case 'email':
          errorsList.push('Enter a valid email.');
          break;
        case 'pattern':
          errorsList.push('Invalid pattern.');
          break;
        // Add more cases as needed
        default:
          errorsList.push(
            errors[errorName] ? errors[errorName] : 'This field is invalid',
          );
      }
    }

    return errorsList;
  });
}
