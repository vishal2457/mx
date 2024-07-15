import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractValue',
})
export class ExtractValuePipe implements PipeTransform {
  transform(element: any, field: string): string {
    const keys = field.split('.');
    return keys.reduce((acc, key) => {
      if (acc) {
        return acc[key];
      }
      return '';
    }, element);
  }
}
