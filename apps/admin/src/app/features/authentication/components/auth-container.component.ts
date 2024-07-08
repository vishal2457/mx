import { Component } from "@angular/core";
import { APP_CONFIG } from "../../../../config";

@Component({
  selector: 'auth-container',
  template:  `<div class="grid h-screen place-items-center">
  <div mxCard class="w-[25rem]">
    <div mxCardHeader>
      <div mxCardtitle class="align-center flex justify-center">
        <img src="/assets/logo.png" class="h-20 w-h-20" />
      </div>
    </div>
    <div mxCardContent>
      <div class="flex justify-center align-center">
        <p class="text-2xl self-end">{{ PANEL_CONFIG.name }}</p>
      </div>
      <ng-content> </ng-content>
       </div>
  </div>
</div>

      `
})

export class AuthContainerComponent {
  PANEL_CONFIG = APP_CONFIG.panelConfig;

}
