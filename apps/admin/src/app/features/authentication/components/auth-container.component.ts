import { Component } from '@angular/core';
import { APP_CONFIG } from '../../../../config';

@Component({
  selector: 'auth-container',
  template: `<div
    class="grid h-screen place-items-center bg-gradient-to-r from-blue-200 to-cyan-200"
  >
    <div mxCard class="w-[25rem]">
      <div mxCardHeader>
        <div mxCardtitle class="align-center flex justify-center">
          <img src="/assets/logo.png" class="h-20 w-h-20" />
        </div>
      </div>
      <div mxCardContent>
        <div class="flex justify-center align-center">
          <p class="text-2xl self-end">Control Panel Login</p>
        </div>
        <ng-content> </ng-content>
      </div>
    </div>
  </div> `,
})
export class AuthContainerComponent {
  PANEL_CONFIG = APP_CONFIG.panelConfig;
}
