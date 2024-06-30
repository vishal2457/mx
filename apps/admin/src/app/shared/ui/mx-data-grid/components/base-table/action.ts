import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { GridColumnsComponent } from './columns';

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
  @Input() variant: 'destructive' | 'success' | 'warning' | 'default' =
    'default';

  @Output() handleClick = new EventEmitter();
}
