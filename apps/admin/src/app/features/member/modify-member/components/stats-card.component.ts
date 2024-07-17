import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MxCardModule } from '../../../../shared/ui/card/card.module';
import { DisplayCurrencyComponent } from '../../../../shared/misc/display-currency.component';

@Component({
  selector: 'stats-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MxCardModule, DisplayCurrencyComponent],
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
      @if (amount) {
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
