import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    text?: string | null,
    length = 10,
    ellipsis = '…',
  ): string | undefined {
    if (!text) {
      return '';
    } else if (text.length > length) {
      return text.substring(0, length).trim() + ellipsis;
    }

    return text;
  }
}
