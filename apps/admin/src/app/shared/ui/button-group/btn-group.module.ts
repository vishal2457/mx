import { NgModule } from "@angular/core";
import { MxBtnGroupComponent } from "./btn-group";
import { MxBtnGroupContainerComponent } from "./btn-group-container";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { MxIconComponent } from "../icon";
@NgModule({
  declarations: [MxBtnGroupComponent, MxBtnGroupContainerComponent],
  imports: [NgIf, NgFor, MxIconComponent, NgClass],
  exports: [MxBtnGroupContainerComponent, MxBtnGroupComponent],
})
export class MxBtnGroupModule {}
