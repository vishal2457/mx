import {
  booleanAttribute,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { MxHintComponent } from '../hint';
import { MxCardModule } from '../card/card.module';

@Component({
  selector: 'mx-file-upload',
  standalone: true,
  imports: [MxHintComponent, MxCardModule],
  template: `
    <div class="flex flex-col p-4" mxCard>
      @if(label()) {
      <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      >
        {{ label() }}
      </label>
      } @for (hint of internalHints(); track hint) {
      <mx-hint [message]="hint" />
      }
      <span class="py-1"> </span>

      <input
        type="file"
        [multiple]="multiple"
        (change)="internalFileHandler($event)"
        [accept]="accept()"
      />
      <span class="py-1"> </span>

      @for (error of errors(); track error) {
      <mx-hint [message]="error" type="error" />
      }
    </div>
  `,
})
export class MxFileUploadComponent {
  @Output() handleFileChange = new EventEmitter();

  @Input() showFileSize = true;
  @Input({ transform: booleanAttribute }) multiple = false;
  label = input<string>('');
  accept = input<string>('*');
  maxFileSizeMB = input<number>();
  hints = input<string[]>([]);

  protected errors = signal<string[]>([]);
  protected internalHints = computed(() => {
    const hints = this.hints();
    if (this.maxFileSizeMB()) {
      hints.push(`Max file size: ${this.maxFileSizeMB()} MB`);
    }
    return hints;
  });

  internalFileHandler(e: any) {
    this.errors.set([]);

    if (this.multiple) {
      this.handleFileChange.emit(e.target.files);
    } else {
      const file = e.target.files[0];
      if (!this.validate(file)) {
        return;
      }
      this.handleFileChange.emit(file);
    }
  }

  private validate(file: File): boolean {
    const maxFileSizeMB = this.maxFileSizeMB();
    if (maxFileSizeMB) {
      const currentFileSize = this.fileSizeMB(file);
      if (file.size > maxFileSizeMB) {
        this.errors.update((value) => {
          value.push(
            `File size should be less then ${maxFileSizeMB} MB, it is ${currentFileSize} MB`
          );
          return value;
        });
        return false;
      }
    }

    return true;
  }

  private fileSizeMB(file: File) {
    const mb = file.size / (1024 * 1024);
    return parseFloat(mb.toFixed(2));
  }
}
