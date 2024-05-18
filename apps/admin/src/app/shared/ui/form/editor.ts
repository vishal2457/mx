import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBaseComponent } from './base-form';
import { FormControlPipe } from '../../pipe/form-control';
import { MxLabelComponent } from './mx-label';

@Component({
  selector: 'mx-editor',
  standalone: true,
  imports: [
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    MxLabelComponent,
  ],
  template: `
    <mx-label [label]="label" />
    <ckeditor
      [editor]="Editor"
      [config]="config"
      [formControl]="control | formControl"
    ></ckeditor>
  `,
})
export class MxEditorComponent extends FormBaseComponent {
  public Editor = ClassicEditor;
  config = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
    ],
  };
}
