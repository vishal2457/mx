import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../shared/services/theme.service';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { APP_CONFIG } from '../../../../config';
import { SubSink } from '../../../shared/utils/sub-sink';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../shared/services/user-data.service';

@Component({
  selector: 'mx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  router = inject(Router);
  userService = inject(UserService);

  theme$ = this.themeService.theme$;
  organisation$ = this.userService.organisation$;
  sidebarOpen = true;
  PANEL_CONFIG = APP_CONFIG.panelConfig;
  lastBuild = environment.latestBuildTime;
  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.sidebarService.sidebarOpen$.subscribe(
      (value) => (this.sidebarOpen = value),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  logout() {
    this.router.navigate(['/auth']);
  }
}
