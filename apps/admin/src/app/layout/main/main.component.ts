import { Component, inject, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { SidebarService } from '../../shared/services/sidebar.service';
import { ThemeService } from '../../shared/services/theme.service';
import { MxProgressbarComponent } from '../../shared/ui/progress-bar/progress-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  @ViewChild(MxProgressbarComponent) progressBar!: MxProgressbarComponent;

  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);

  constructor(private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.launchProgressbar(e);
    })
  }

  // start and stops the progress bar during RouterEvent changes
  launchProgressbar(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.progressBar.startLoading()
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.progressBar.stopLoading()
      }, 500);
    }

    // Set loading state to false in both of the below events to hide the progress bar in case a request fails
    if (event instanceof NavigationCancel) {
      this.progressBar.stopLoading()
    }
    if (event instanceof NavigationError) {
      this.progressBar.stopLoading()
    }
  }


}
