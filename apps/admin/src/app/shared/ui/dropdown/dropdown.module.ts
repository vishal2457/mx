import { NgModule } from "@angular/core";
import { MxDropdownComponent, MxDropdownItemComponent } from "./dropdown";
import { CdkMenuModule } from "@angular/cdk/menu";
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { MxIconComponent } from "../icon";

@NgModule({
  declarations: [MxDropdownComponent, MxDropdownItemComponent],
  imports: [
    CdkMenuModule,
    NgIf,
    NgFor,
    MxIconComponent,
    NgTemplateOutlet,
    NgClass,
  ],
  exports: [MxDropdownComponent, MxDropdownItemComponent],
})
export class MxDropdownModule {}
