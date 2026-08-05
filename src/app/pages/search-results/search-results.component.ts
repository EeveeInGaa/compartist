import {
  ChangeDetectionStrategy,
  Component,
  debounced,
  inject,
  input,
} from '@angular/core';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { ArtistsService } from '../../utils/services/artists.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Artist } from '../../utils/interfaces/artist.interface';

@Component({
  selector: 'ca-search-results',
  imports: [ListItemComponent, TranslocoPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  private readonly artistsService = inject(ArtistsService);

  readonly term = input('');

  private readonly debouncedTerm = debounced(() => this.term().trim(), 250);

  private readonly artistsResource = rxResource({
    params: () => this.debouncedTerm.value() || undefined,
    stream: ({ params: term }) =>
      this.artistsService
        .getArtistsBySearching(term)
        .pipe(
          map((response) => response.results.artistmatches.artist.slice(0, 20)),
        ),
    defaultValue: [] as Artist[],
  });

  readonly foundArtists = this.artistsResource.value;
  readonly isLoading = this.artistsResource.isLoading;
  readonly searchError = this.artistsResource.error;
}
