import { CdkMenuModule } from '@angular/cdk/menu';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mx-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkMenuModule, NgClass],
  template: `<span [cdkMenuTriggerFor]="dropdownPanel">
      <ng-content select="[trigger]"></ng-content>
    </span>

    <ng-template #dropdownPanel>
      <div
        class="flex flex-col items-start z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        [ngClass]="spacingClass"
        cdkMenu
      >
        <ng-content></ng-content>
      </div>
    </ng-template>`,
})
export class MxDropdownComponent {
  @Input() spacingClass = '';
}
