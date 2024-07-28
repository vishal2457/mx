import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stats-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div mxCard>
    <div
      mxCardHeader
      class="flex-row items-center justify-between space-y-1 py-4 px-6"
    >
      <div mxCardtitle>
        {{ title }}
      </div>
    </div>
    <div mxCardContent>
      @if (amount || amount === 0) {
        <display-currency [amount]="amount" />
      } @else if (value) {
        <p class="text-2xl font-bold">{{ value }}</p>
      }
    </div>
  </div>`,
})
export class StatsCardComponent {
  @Input({ required: true }) title = '';
  @Input() amount!: number;
  @Input() value = '';
}
