import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, combineLatest, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { matchSorter } from 'match-sorter';
import { MENU_DATA } from '../constants/menu-contstant';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  ls = inject(LocalStorageService);
  private menu = new BehaviorSubject(MENU_DATA);
  private archive = new BehaviorSubject<string[]>(
    this.ls.get('archiveMenu') || [],
  );
  private sidebarOpen = new BehaviorSubject(true);
  private searchMenu = new BehaviorSubject('');

  mainMenu$ = combineLatest([
    this.menu.asObservable(),
    this.archive.asObservable(),
    this.searchMenu.asObservable(),
  ]).pipe(
    map(([menu, archived, searchTerm]) => {
      const finalMenu = menu.filter((m) => !archived.includes(m.name));
      if (searchTerm) {
        return matchSorter(finalMenu, searchTerm, { keys: ['name'] });
      }
      return finalMenu;
    }),
  );

  archived$ = combineLatest([
    this.menu.asObservable(),
    this.archive.asObservable(),
  ]).pipe(
    map(([menu, archived]) => {
      return menu.filter((m) => archived.includes(m.name));
    }),
  );

  sidebarOpen$ = this.sidebarOpen.asObservable().pipe(shareReplay());

  setMenu(menu) {
    this.menu.next(menu);
  }

  toggleSidebar() {
    const currentValue = this.sidebarOpen.value;
    this.sidebarOpen.next(!currentValue);
  }

  archiveMenu(name: string) {
    const archive = this.archive.value;
    archive.push(name);
    this.archive.next(archive);
    this.ls.set('archiveMenu', archive);
  }

  unarchiveMenu(name: string) {
    const archive = this.archive.value;
    archive.splice(
      archive.findIndex((i) => i === name),
      1,
    );
    this.archive.next(archive);
    this.ls.set('archiveMenu', archive);
  }

  updateSearchTerm(term: string) {
    this.searchMenu.next(term);
  }

  getMenu() {
    return this.menu.value;
  }
}
