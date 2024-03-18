import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit',
  standalone: true,
})
export class WordLimitPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    let words = value.split(/\s+/);
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return value;
  }
}
