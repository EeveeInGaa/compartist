import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { SearchService } from '../../utils/services/search.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  readonly foundArtists = this.searchService.getFoundArtists();

  goToDetails(name: string) {
    this.router.navigate(['artist-list/detail', name]);
  }
}
