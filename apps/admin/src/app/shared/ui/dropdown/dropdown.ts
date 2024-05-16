import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ContentChild,
  TemplateRef,
} from "@angular/core";

// This is single dropdown item
@Component({
  selector: "mx-dropdown-item",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      *ngIf="!item; else itemOutlet"
      (click)="handleClick.emit($event)"
      class="w-full cursor-pointer relative flex select-none items-center rounded-sm px-2 py-0.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <mx-icon [icon]="icon" size="sm" class="mr-2" />
      <p>{{ text }}</p>
    </button>

    <ng-template #itemOutlet>
      <ng-container *ngIf="item">
        <ng-container *ngTemplateOutlet="item"></ng-container>
      </ng-container>
    </ng-template>
  `,
})
export class MxDropdownItemComponent {
  @Input() icon = "";
  @Input() text = "";
  @Input() seperator = false;

  @ContentChild("item") item?: TemplateRef<any>;

  @Output() handleClick = new EventEmitter();
}

// This is main dropdown wrapper
@Component({
  selector: "mx-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [cdkMenuTriggerFor]="dropdownPanel">
      <ng-content select="[trigger]"></ng-content>
    </span>

    <ng-template #dropdownPanel>
      <div
        class="flex flex-col items-start z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        [ngClass]="spacingClass"
        cdkMenu
      >
        <ng-container *ngFor="let dropdownItem of dropdownItems">
          <div
            class=" my-1 h-px border w-full"
            *ngIf="dropdownItem.seperator"
          ></div>
          <mx-dropdown-item
            *ngIf="!dropdownItem.seperator"
            cdkMenuItem
            [text]="dropdownItem.text"
            [icon]="dropdownItem.icon"
            (handleClick)="dropdownItem.handleClick.emit($event)"
            class="w-full"
          >
            <ng-container *ngIf="dropdownItem.item">
              <ng-template #item>
                <ng-container
                  *ngTemplateOutlet="dropdownItem.item"
                ></ng-container>
              </ng-template>
            </ng-container>
          </mx-dropdown-item>
        </ng-container>
      </div>
    </ng-template>`,
})
export class MxDropdownComponent {
  @ContentChildren(MxDropdownItemComponent)
  dropdownItems!: QueryList<MxDropdownItemComponent>;

  @Input() spacing: "compact" | "default" | "wide" = "default";
  get spacingClass() {
    const gap = {
      compact: "gap-0",
      default: "gap-2",
      wide: "gap-3",
    };
    return gap[this.spacing];
  }
}
