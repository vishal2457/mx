import { Component, inject } from '@angular/core';
import { MxDialogModule } from '../../ui/dialog/dialog.module';
import { MxTextareaComponent } from '../../ui/form/textarea';
import { FormControl, Validators } from '@angular/forms';
import { MxButtonComponent } from '../../ui/button';
import { ApiService } from '../../services/api.service';
import { MxIconComponent } from '../../ui/icon';

@Component({
  standalone: true,
  imports: [
    MxDialogModule,
    MxTextareaComponent,
    MxButtonComponent,
    MxIconComponent,
  ],
  selector: 'ask-modal',
  template: `<mx-dialog-content>
    <mx-dialog-header>
      <div class="flex gap-2 items-center">
        <mx-dialog-title>Ask AI</mx-dialog-title>
        <mx-icon icon="sparkels" />
      </div>
      <mx-dialog-description
        >Talk to your data, ask about members progress, analytics
        etc.</mx-dialog-description
      >
    </mx-dialog-header>
    @if (chat.length) {
      <hr class="h-[px]" />
    } @else {
      <div class="my-4"></div>
    }
    @for (c of chat; track c) {
      @if (c.q) {
        <div class="text-end">
          <div class="p-3 bg-secondary rounded-md border-secondary">
            {{ c.q }}
          </div>
        </div>
      } @else if (c.a) {
        <div class="text-left p-3 border rounded-md">{{ c.a }}</div>
      }
    }
    <mx-textarea
      [control]="question"
      placeholder="Ask questions about the platform"
    />
    <mx-dialog-footer>
      <mx-button (handleClick)="askAi()" [disabled]="loading">Send</mx-button>
    </mx-dialog-footer>
  </mx-dialog-content>`,
})
export class AskModalComponent {
  private api = inject(ApiService);

  question = new FormControl('', [Validators.required]);
  loading = false;

  chat: { q?: string; a?: string }[] = [];

  askAi() {
    if (this.question.invalid) {
      return;
    }
    this.loading = true;
    const qsn = this.question.value as string;
    this.question.reset();
    this.chat.push({ q: qsn });

    this.api.get<string>(`/organisation/ask-ai?qsn=${qsn}`).subscribe((res) => {
      this.chat.push({ a: res.data });
      this.loading = false;
    });
  }
}
