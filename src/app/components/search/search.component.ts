import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  readonly searchValue = output<string>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value === undefined || value === null) {
      console.error('No value provided');
    }
    this.searchValue.emit(value);
  }
}
