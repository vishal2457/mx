import { Component, ViewChild } from '@angular/core';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';
import { config } from './types';

@Component({
    selector: 'mx-progressbar',
    template: `
    <ng-progress #mxProgress
        [color]="progressConfig.color" 
        [spinner]="progressConfig.spinner" 
        [spinnerPosition]="progressConfig.spinnerPosition" 
        [direction]="progressConfig.direction"
        [speed]="progressConfig.speed" 
    />
  `,
    standalone: true,
    imports: [NgProgressModule]
})
export class MxProgressbarComponent {

    @ViewChild(NgProgressComponent) progress!: NgProgressComponent;
    progressConfig: config = { color: 'red', spinner: false, spinnerPosition: 'left', direction: 'ltr+', speed: 500 };;

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