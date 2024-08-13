import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workout-logs',
  template: `<mx-grid-shell apiURL="/member"> </mx-grid-shell>`,
})
export class WorkoutLogsComponent {}
