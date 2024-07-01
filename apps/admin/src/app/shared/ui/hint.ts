import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { mergetw } from '../utils/tw-merge';

const textVariants = cva('italic text-md', {
  variants: {
    type: {
      default: 'text-slate-500',
      error: 'text-red-500',
      link: 'text-blue-500  hover:underline cursor-pointer',
    },
    position: {
      default: '',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

@Component({
  selector: 'mx-hint',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  template: `<div class="flex items-center" [class]="defaultClass">
    <div class="flex flex-col">
      <small>
        {{ message }}
      </small>
    </div>
  </div>`,
})
export class MxHintComponent {
  @Input() message = '';
  @Input() type: VariantProps<typeof textVariants>['type'] = 'default';
  @Input() position: VariantProps<typeof textVariants>['position'] = 'default';
  get defaultClass() {
    return mergetw(
      textVariants({
        type: this.type,
        position: this.position,
      })
    );
  }
}
