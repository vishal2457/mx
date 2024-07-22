import { Component, ViewChild } from '@angular/core';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';
import { config } from './types';

@Component({
  selector: 'mx-progressbar',
  template: `
    <ng-progress
      #mxProgress
      [color]="progressConfig.color"
      [spinner]="progressConfig.spinner"
      [spinnerPosition]="progressConfig.spinnerPosition"
      [direction]="progressConfig.direction"
      [speed]="progressConfig.speed"
    />
  `,
  standalone: true,
  imports: [NgProgressModule],
})
export class MxProgressbarComponent {
  @ViewChild(NgProgressComponent) progress!: NgProgressComponent;
  progressConfig: any = {
    color: 'blue',
    spinner: true,
    spinnerPosition: 'right',
    direction: 'ltr+',
    speed: 300,
    thick: true,
  };

  startLoading() {
    this.progress.start();
  }

  stopLoading() {
    this.progress.complete();
  }

  configureProgress(config: config) {
    this.progressConfig = config;
  }
}
