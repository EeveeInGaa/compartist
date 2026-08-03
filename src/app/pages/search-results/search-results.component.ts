import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { SearchService } from '../../utils/services/search.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-search-results',
  imports: [ListItemComponent, TranslocoPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  readonly term = input('');

  readonly foundArtists = this.searchService.foundArtists;
  readonly isLoading = this.searchService.isLoading;
  readonly searchError = this.searchService.error;

  private readonly synchronizeSearchTerm = effect(() => {
    this.searchService.setSearchTerm(this.term());
  });

  goToDetails(name: string): void {
    void this.router.navigate(['artist-list/detail', name]);
  }
}
