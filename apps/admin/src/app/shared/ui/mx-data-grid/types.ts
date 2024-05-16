import { EventEmitter } from '@angular/core';

export interface GridFilters {
  type: 'date' | 'select' | 'text' | 'number' | 'checkbox';
  placeholder?: string | undefined;
  bindValue?: string;
  bindLabel?: string;
  dataKey?: string;
  filterKey?: string;
}

export interface ToolbarOptions {
  name: string;
  icon: string;
  emit?: boolean;
}

export const STATIC_ACTION_HEADER = {
  title: 'A',
  field: 'action',
  alignment: 'center',
} as const;

export const STATIC_SELECTABLE_HEADER = {
  title: 'A',
  field: 'selectable',
  alignment: 'center',
} as const;

export interface Emitter {
  emit: (value: any) => void;
  updateEmitter: (emitter: EventEmitter<any>) => void;
}

export const DEFAULT_ROWS = [5, 10, 20, 50, 100, 200];
export interface MetaData {
  title: string;
}

export type HideFeatures = Array<'footer' | 'toolbar'>;
