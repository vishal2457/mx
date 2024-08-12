import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { UserService } from '../../../shared/services/user-data.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MENU_DATA } from '../../../shared/constants/menu-contstant';
import { PERMISSIONS } from '../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'mx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  ls = inject(LocalStorageService);
  router = inject(Router);
  sidebarService = inject(SidebarService);
  userService = inject(UserService);

  @Output() changeTheme = new EventEmitter();
  @Input() theme: string | null = 'light';

  archiveMenu: number[] = this.ls.get('archiveMenu') || [];
  searchMenu = new FormControl<string>('');
  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.userService.permissions$.subscribe((permissions) => {
      const menu = MENU_DATA;

      const permittedMenu = menu.filter((item) => {
        return permissions.some(
          (i) =>
            i.rolePermission.menuName === item.name &&
            i.rolePermission.permission === PERMISSIONS.VIEW,
        );
      });
      this.sidebarService.setMenu(permittedMenu);
    });

    this.subs.sink = this.searchMenu.valueChanges.subscribe((value) =>
      this.sidebarService.updateSearchTerm(value || ''),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleArchiveMenu(id: number) {
    this.archiveMenu.push(id);
    this.ls.set('archiveMenu', this.archiveMenu);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
