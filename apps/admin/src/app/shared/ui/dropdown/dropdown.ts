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
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from '../../utils/sub-sink';

// This is single dropdown item
@Component({
  selector: 'mx-dropdown-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!item){ @if(checkbox) {
    <mx-checkbox [control]="control" [label]="text" />
    } @else {
    <button
      (click)="handleClick.emit($event)"
      class="w-full cursor-pointer relative flex select-none items-center rounded-sm px-2 py-0.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <mx-icon [icon]="icon" size="sm" class="mr-2" />
      <p>{{ text }}</p>
    </button>
    } } @else if(item) {
    <ng-container *ngTemplateOutlet="item"></ng-container>
    }
  `,
})
export class MxDropdownItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() icon = '';
  @Input() text = '';
  @Input() seperator = false;
  @Input() checkbox = false;
  @Input() checkboxValue = true;

  @ContentChild('item') item?: TemplateRef<any>;

  @Output() handleClick = new EventEmitter();

  control!: FormControl;
  private subs = new SubSink();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkboxValue']?.currentValue && this.control) {
      this.control.setValue(changes['checkboxValue'].currentValue);
    }
  }

  ngOnInit(): void {
    if (this.checkbox) {
      this.control = new FormControl(this.checkboxValue);
      this.subs.sink = this.control.valueChanges.subscribe((value) => {
        this.handleClick.emit();
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

// This is main dropdown wrapper
@Component({
  selector: 'mx-dropdown',
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
        @if(dropdownTitle) {
        <p class="text-sm">{{ dropdownTitle }}</p>
        <div class=" my-1 h-px border w-full"></div>
        } @for (dropdownItem of dropdownItems; track dropdownItem.text) { @if
        (dropdownItem.seperator) {
        <div class=" my-1 h-px border w-full"></div>
        } @if(!dropdownItem.seperator) {
        <mx-dropdown-item
          cdkMenuItem
          [text]="dropdownItem.text"
          [icon]="dropdownItem.icon"
          [checkbox]="dropdownItem.checkbox"
          (handleClick)="handleItemClick($event, dropdownItem)"
          class="w-full"
        >
          @if(dropdownItem.item) {
          <ng-template #item>
            <ng-container *ngTemplateOutlet="dropdownItem.item"></ng-container>
          </ng-template>
          }
        </mx-dropdown-item>
        } }
      </div>
    </ng-template>`,
})
export class MxDropdownComponent {
  @ContentChildren(MxDropdownItemComponent)
  dropdownItems!: QueryList<MxDropdownItemComponent>;

  @Input() closeOnSelect = true;
  @Input() dropdownTitle = '';
  @Input() spacing: 'compact' | 'default' | 'wide' = 'default';
  get spacingClass() {
    const gap = {
      compact: 'gap-0',
      default: 'gap-2',
      wide: 'gap-3',
    };
    return gap[this.spacing];
  }

  protected handleItemClick(
    event: Event,
    dropdownItem: MxDropdownItemComponent
  ) {
    if (!this.closeOnSelect) {
      event?.stopPropagation();
    }
    dropdownItem.handleClick.emit({
      event,
      checkboxValue: dropdownItem.control?.value,
    });
  }
}
