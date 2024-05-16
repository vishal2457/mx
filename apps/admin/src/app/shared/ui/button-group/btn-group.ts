import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'mx-btn-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [title]="text"
      (click)="handleClick.emit($event)"
      type="button"
      class="border-e px-2 py-1 text-sm font-medium focus:relative bg-background transition-colors"
      [ngClass]="{
        'bg-muted/95': active,
        'hover:bg-muted/100': !active
      }"
    >
      <mx-icon [icon]="icon" *ngIf="icon" />
      <ng-container *ngIf="text && !icon">
        {{ text }}
      </ng-container>
    </button>
  `,
})
export class MxBtnGroupComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() active = false;

  @Output() handleClick = new EventEmitter();
}
