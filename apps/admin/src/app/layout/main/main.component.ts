import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { SidebarService } from '../../shared/services/sidebar.service';
import { ThemeService } from '../../shared/services/theme.service';
import { MxProgressbarComponent } from '../../shared/ui/progress-bar/progress-bar';
import { SubSink } from '../../shared/utils/sub-sink';
import { UserService } from '../../shared/services/user-data.service';
import { ApiService } from '../../shared/services/api.service';
import { TOrganisation, TUser } from '../../../../../../libs/mx-schema/src';

type MeResponse = {
  permissions: Array<any>;
  user: TUser;
  organisation: TOrganisation;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy, OnInit {
  @ViewChild('mxProgress') progressBar!: MxProgressbarComponent;

  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  private router = inject(Router);
  private userService = inject(UserService);
  private api = inject(ApiService);

  private subs = new SubSink();

  ngOnInit(): void {
    this.initUser();
    this.subs.sink = this.router.events.subscribe((e: RouterEvent) => {
      this.launchProgressbar(e);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // start and stops the progress bar during RouterEvent changes
  launchProgressbar(event: RouterEvent): void {
    if (!this.progressBar) {
      return;
    }
    if (event instanceof NavigationStart) {
      this.progressBar.startLoading();
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.progressBar.stopLoading();
      }, 300);
    }

    // Set loading state to false in both of the below events to hide the progress bar in case a request fails
    if (event instanceof NavigationCancel) {
      this.progressBar.stopLoading();
    }
    if (event instanceof NavigationError) {
      this.progressBar.stopLoading();
    }
  }

  initUser() {
    this.api.get<MeResponse>('/user/me').subscribe({
      next: (result) => {
        this.userService.setUser(result.data.user);
        this.userService.setOrganisation(result.data.organisation);
        // TODO: change menu according to permission
      },
    });
  }
}
