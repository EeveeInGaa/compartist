import {
  computed,
  debounced,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { ArtistsService } from './artists.service';
import { Artist } from '../interfaces/artist.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly artistsService = inject(ArtistsService);

  private readonly searchTermState = signal('');

  readonly searchTerm = this.searchTermState.asReadonly();

  private readonly debouncedTerm = debounced(
    () => this.searchTermState().trim(),
    250,
  );

  private readonly artistsResource = rxResource({
    params: () => {
      const term = this.debouncedTerm.value();
      return term || undefined;
    },

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
  readonly error = this.artistsResource.error;

  readonly hasResults = computed(() => this.foundArtists().length > 0);

  setSearchTerm(term: string): void {
    this.searchTermState.set(term);
  }
}
