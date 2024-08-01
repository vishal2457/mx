import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  input,
  QueryList,
} from '@angular/core';
import { MxBtnGroupComponent } from './btn-group';
import { mergetw } from '../../utils/tw-merge';

@Component({
  selector: 'mx-btn-group-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="_containerClass()">
      @for (btn of btns; track btn.text) {
        <mx-btn-group
          [text]="btn.text"
          [icon]="btn.icon"
          [active]="btn.active"
          (handleClick)="btn.handleClick.emit($event)"
        />
      }
    </span>
  `,
})
export class MxBtnGroupContainerComponent {
  @ContentChildren(MxBtnGroupComponent) btns!: QueryList<MxBtnGroupComponent>;

  containerClass = input('');
  _containerClass = computed(() => {
    return mergetw(
      'inline-flex overflow-hidden rounded-md border-y border-l shadow-sm',
      this.containerClass(),
    );
  });
}
