import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TEvent, Z_Event } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  Z_Event = Z_Event;

  private fb = inject(FormBuilder);

  eventForm = this.fb.nonNullable.group<
    ControlsOf<
      Omit<TEvent, 'createdAt' | 'updatedAt' | 'id' | 'image'> & { image: any }
    >
  >({
    title: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    image: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    active: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    eventDate: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    eventTime: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.eventForm.controls;
  }

  isInValid() {
    return this.eventForm.invalid;
  }

  getFormValue() {
    console.log(this.eventForm.value);

    return this.eventForm.value;
  }

  reset() {
    this.eventForm.reset();
  }

  patchValue(value) {
    this.eventForm.patchValue(value);
  }

  markAllAsTouched() {
    this.eventForm.markAllAsTouched();
  }

  handleFileChange(file: File) {
    console.log(file);

    this.eventForm.patchValue({ image: file });
  }
}
