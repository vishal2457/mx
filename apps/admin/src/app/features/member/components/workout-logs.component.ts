import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  TMember,
  TmemberWorkoutLog,
} from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { safeStringify } from '../../../shared/utils/safe-json';

@Component({
  selector: 'workout-logs',
  template: `<mx-dialog-content>
    <mx-dialog-header>
      <mx-dialog-title class="capitalize"
        >{{ data.name }}'s Workout Logs</mx-dialog-title
      >
      <mx-dialog-description> workout history</mx-dialog-description>
      <div class="flex flex-col gap-2 h-72 overflow-y-auto">
        @for (log of logs; track log.id) {
          <div class="border rounded-sm p-2">
            <div class="flex justify-between">
              <div>
                <p>
                  {{ log.exerciseName }}
                </p>
                <p class="text-sm">Sets: {{ log.sets }}</p>
                <p class="text-sm">Reps: {{ log.reps }}</p>
                <p class="text-sm">
                  Suggested:
                  {{ log.workoutTemplateDetailID ? 'System' : 'User' }}
                </p>
              </div>
              <div>
                <p class="text-sm">{{ log.createdAt | date: 'mediumDate' }}</p>
                <p class="text-sm">{{ log.intensity }}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </mx-dialog-header>
  </mx-dialog-content>`,
})
export class WorkoutLogsComponent implements OnInit {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: TMember,
  ) {}

  private api = inject(ApiService);

  protected logs: TmemberWorkoutLog[] = [];

  ngOnInit(): void {
    this.api
      .getList<TmemberWorkoutLog>(`/member/workout-log-list/${this.data.id}`, {
        page: 1,
        limit: 100,
        sort: safeStringify({}),
        filters: safeStringify({}),
        fields: '',
      })
      .subscribe((data) => {
        this.logs = data.data.rows;
      });
  }
}
