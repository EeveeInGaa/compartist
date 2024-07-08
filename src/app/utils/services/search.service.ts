import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { ArtistsService } from './artists.service';
import { Artist } from '../interfaces/artist.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private artistService = inject(ArtistsService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  readonly searchTerm = signal<string>('');
  readonly foundArtists = signal<Artist[]>([]);

  /*I am aware that it would be better to put the logic in a store, but it seems a bid too much for this project*/
  readonly foundArtistsSubscription = effect(() => {
    if (this.searchTerm() !== '') {
      this.artistService
        .getArtistsBySearching(this.searchTerm())
        .pipe(debounceTime(250), takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            const found = res.results.artistmatches.artist.slice(0, 20);
            this.foundArtists.set(found);
          },
        });
    }
  });

  readonly param = effect(
    () => {
      this.route.queryParams.subscribe((param) => {
        this.searchTerm.set(param['term']);
      });
    },
    /*I am aware that this is not best practice and should only be used in exceptions,
    but for this use case I consider it fine to make it work.*/
    { allowSignalWrites: true },
  );

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  getFoundArtists() {
    return this.foundArtists;
  }
}
