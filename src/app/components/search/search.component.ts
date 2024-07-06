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
  searchValue = output<string>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.emit(value);
  }
}
