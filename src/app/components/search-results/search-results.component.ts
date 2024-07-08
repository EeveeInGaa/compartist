import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { SearchService } from '../../services/search.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ca-search-results',
  standalone: true,
  imports: [ListItemComponent, TranslocoPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  private searchService = inject(SearchService);
  readonly foundArtists = this.searchService.getFoundArtists();
}
