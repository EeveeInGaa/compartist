import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ca-search',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
