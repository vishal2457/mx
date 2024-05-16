import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { VariantProps, cva } from "class-variance-authority";
import { mergetw } from "../utils/tw-merge";

const badgeVariants = cva(
  "inline-flex items-center border rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

@Component({
  selector: "mx-badge",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [class]="finalClass">{{ text }}</div>`,
})
export class MxBadgeComponent {
  @Input() text = "";
  @Input() class = "";
  @Input() variant: VariantProps<typeof badgeVariants>["variant"] = "default";
  get finalClass() {
    return mergetw(badgeVariants({ variant: this.variant }), this.class);
  }
}
