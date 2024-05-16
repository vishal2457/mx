import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ZodSchema } from 'zod';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'mx-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      (click)="patchRandomValues()"
      *ngIf="!environment.production"
      class="cursor-pointer"
      >Fill random values</a
    >
    <form [formGroup]="form">
      <ng-content></ng-content>
    </form>
  `,
})
export class MxFormComponent {
  @Input() form!: FormGroup;
  @Input() zodSchema!: ZodSchema;

  environment = environment;

  patchRandomValues() {
    if (!environment.production) {
      if (this.zodSchema) {
        import('@anatine/zod-mock').then(({ generateMock }) => {
          this.form.patchValue(generateMock(this.zodSchema));
        });
      } else {
        import('../../../dev/generate-values-dev').then(
          ({ generateAndPatchValues }) => {
            generateAndPatchValues(this.form.controls);
          }
        );
      }
    }
  }
}
