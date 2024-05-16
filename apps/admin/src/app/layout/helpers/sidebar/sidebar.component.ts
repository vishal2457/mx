import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SidebarService } from '../../../shared/services/sidebar.service';

@Component({
  selector: 'mx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  ls = inject(LocalStorageService);
  router = inject(Router);
  sidebarService = inject(SidebarService);

  @Output() changeTheme = new EventEmitter();
  @Input() theme = 'light';

  archiveMenu: number[] = this.ls.get('archiveMenu') || [];

  handleArchiveMenu(id: number) {
    this.archiveMenu.push(id);
    this.ls.set('archiveMenu', this.archiveMenu);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
