import { CdkMenuModule } from '@angular/cdk/menu';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Input,
} from '@angular/core';
import { mergetw } from '../utils/tw-merge';

@Component({
  selector: 'mx-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkMenuModule],
  template: `<span [cdkMenuTriggerFor]="overlayPanel">
      <ng-content select="[trigger]"></ng-content>
    </span>

    <ng-template #overlayPanel>
      <div [class]="class()" cdkMenu>
        <ng-content></ng-content>
      </div>
    </ng-template>`,
})
export class MxOverlayComponent {
  containerClass = input('');
  protected class = computed(() => {
    return mergetw(
      'flex flex-col items-start z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      this.containerClass(),
    );
  });
}
