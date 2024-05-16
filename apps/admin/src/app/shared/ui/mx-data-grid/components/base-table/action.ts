import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { GridColumnsComponent } from './columns';
import { NgIf } from '@angular/common';
import { MxIconComponent } from '../../../icon';

@Component({
  selector: 'mx-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MxIconComponent],
  template: ` <ng-container *ngIf="action">
      <ng-container
        *ngTemplateOutlet="
          action;
          context: { $implicit: icon, column, cellData }
        "
      ></ng-container>
    </ng-container>
    <mx-icon
      *ngIf="!action"
      (click)="handleClick.emit({cellData, column})"
      [icon]="icon"
      [title]="tooltip"
      class="cursor-pointer"
    />`,
})
export class MxActionComponent {
  @Input() icon!: string;
  @Input() tooltip = '';
  @Input() cellData?: any;
  @Input() column?: GridColumnsComponent;
  @Input() action: TemplateRef<MxActionComponent> | null = null;

  @Output() handleClick = new EventEmitter();

  @ContentChild('template') _action: TemplateRef<MxActionComponent> | null =
    null;
}
