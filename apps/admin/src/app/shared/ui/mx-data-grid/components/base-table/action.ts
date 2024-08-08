import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'mx-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- @if(action) {
    <ng-container
      *ngTemplateOutlet="action; context: { $implicit: icon, column, cellData }"
    ></ng-container>
    } @else {
    <mx-icon
      (click)="handleClick.emit({cellData, column})"
      [icon]="icon"
      [mxTooltip]="tooltip"
      class="cursor-pointer"
      size="lg"
    />
    } -->
  `,
})
export class MxActionComponent {
  @Input() icon!: string;
  @Input() text = '';
  @Input() visible = true;
  @Input() variant: 'destructive' | 'success' | 'warning' | 'default' =
    'default';

  @Output() handleClick = new EventEmitter();
}
