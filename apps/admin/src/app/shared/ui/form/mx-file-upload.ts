import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mx-file-upload',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col">
      @if(label) {
      <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 mb-2 capitalize"
      >
        {{ label }}
      </label>
      }
      <input
        type="file"
        [multiple]="multiple"
        (change)="internalFileHandler($event)"
      />
    </div>
  `,
})
export class MxFileUploadComponent {
  @Output() handleFileChange = new EventEmitter();

  @Input() showFileSize = true;
  @Input() multiple = false;
  @Input() label = '';

  internalFileHandler(e: any) {
    if (this.multiple) {
      this.handleFileChange.emit(e.target.files);
    } else {
      this.handleFileChange.emit(e.target.files[0]);
    }
  }
}
