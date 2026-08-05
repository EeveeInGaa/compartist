import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ca-search',
  imports: [TranslocoPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  readonly searchValue = output<string>();

  onSubmit(event: SubmitEvent, value: string): void {
    event.preventDefault();
    this.searchValue.emit(value);
  }
}
