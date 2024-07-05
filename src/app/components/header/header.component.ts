import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArtistsService } from '../../services/artists.service';
import { Artist } from '../../interfaces/artist.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private artistService = inject(ArtistsService);
  private destroyRef = inject(DestroyRef);

  readonly searchTerm = signal<string>('');
  readonly foundArtists = signal<Artist[]>([]);

  typeSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  readonly searchArtist = effect(() => {
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
}
