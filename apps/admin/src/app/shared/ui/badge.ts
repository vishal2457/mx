import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { mergetw } from '../utils/tw-merge';

const badgeVariants = cva(
  'inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-100 text-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-500',
        secondary:
          'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500',
        error: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
        success:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-500',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
        warning:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'mx-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="finalClass">{{ text }}</span>`,
})
export class MxBadgeComponent {
  @Input() text = '';
  @Input() class = '';
  @Input() variant: VariantProps<typeof badgeVariants>['variant'] = 'default';
  get finalClass() {
    return mergetw(badgeVariants({ variant: this.variant }), this.class);
  }
}
