import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArtistsService } from '../../utils/services/artists.service';
import { LastFMArtistGetInfoResponse } from '../../utils/interfaces/artist.interface';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ca-artist-detail',
  standalone: true,
  imports: [DecimalPipe, TranslocoPipe],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailComponent implements OnInit {
  private readonly artistService = inject(ArtistsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  readonly artistName = signal<string>('');
  readonly artistDetails = signal<LastFMArtistGetInfoResponse | null>(null);

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.artistName.set(name);
    }
  }

  readonly getArtistDetailByName = effect(() => {
    if (this.artistName && this.artistDetails) {
      this.artistService
        .getArtistDetails(this.artistName())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => {
            this.artistDetails.set(data);
          },
        });
    }
  });

  escapeHTML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
