import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mx-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, NgClass],
  template: `
    <img
      [ngClass]="iconClass"
      [ngStyle]="{
        'min-width': sizes[size],
        'max-width': sizes[size]
      }"
      class="dark:invert dark:brightness-[0.9]"
      [src]="'/assets/icons/' + icon + '.png'"
      loading="eager"
    />
  `,
})
export class MxIconComponent {
  protected sizes = {
    sm: '12px',
    md: '15px',
    lg: '18px',
  };

  @Input() icon = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() iconClass!: any;
}
