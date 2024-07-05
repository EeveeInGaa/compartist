import { Component, inject, input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ListItemComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  private searchService = inject(SearchService);
  readonly foundArtists = this.searchService.getFoundArtists();
}
