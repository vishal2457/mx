import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { BehaviorSubject, Subject, shareReplay } from 'rxjs';
import { FilterType } from './types';
import { GbFilterPanelComponent } from './filters.component';
import { FilterData } from '../../../../../../../libs/mx-schema/src';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  overlay = inject(Overlay);

  private filters = new BehaviorSubject<FilterType | []>([]);
  private filterData = new Subject<FilterData[]>();

  filters$ = this.filters.asObservable().pipe(shareReplay());
  filterData$ = this.filterData.asObservable();

  updateFilters(filters: FilterType) {
    this.filters.next(filters);
  }

  updateFilterData(filterData: FilterData[]) {
    this.filterData.next(filterData);
  }

  openFilterPanel() {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().right().top(),
      hasBackdrop: true,
    });

    const injector = this.getFilterInjector(overlayRef);
    const filterPanel = new ComponentPortal(
      GbFilterPanelComponent,
      null,
      injector
    );
    return overlayRef.attach(filterPanel);
  }

  clearFilterData() {
    this.filterData.next([]);
  }

  private getFilterInjector(ref: OverlayRef) {
    const tokens = new WeakMap();
    tokens.set(OverlayRef, ref);
    return Injector.create({
      providers: [{ provide: OverlayRef, useValue: ref }],
    });
  }
}
