import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { ArtistsService } from './artists.service';
import { Artist } from '../interfaces/artist.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private artistService = inject(ArtistsService);
  private destroyRef = inject(DestroyRef);

  readonly searchTerm = signal<string>('');
  readonly foundArtists = signal<Artist[]>([]);

  readonly foundArtistsSubscription = effect(() => {
    this.artistService
      .getArtistsBySearching(this.searchTerm())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          const found = res.results.artistmatches.artist.slice(0, 10);
          this.foundArtists.set(found);
        },
      });
  });

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  getFoundArtists() {
    return this.foundArtists;
  }
}
