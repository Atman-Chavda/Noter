import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'searchHighlighter'
})
export class SearchHighlighterPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search || !value) return value;

    // Escape special regex characters in search string
    const pattern = search
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      .split(' ')
      .filter(term => term.length > 0)
      .join('|');

    const regex = new RegExp(pattern, 'gi');

    // Replace matched text with <mark> wrapped text
    return value.replace(regex, match => `<mark>${match}</mark>`);
  }
}
