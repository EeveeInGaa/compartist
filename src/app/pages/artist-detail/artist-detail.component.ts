import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ArtistsService } from '../../utils/services/artists.service';
import { DecimalPipe } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { getArtistImageUrl } from '../../utils/functions/artist-image';

@Component({
  selector: 'ca-artist-detail',
  imports: [DecimalPipe, TranslocoPipe],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailComponent {
  private readonly artistService = inject(ArtistsService);

  readonly name = input('');

  private readonly artistDetailsResource = rxResource({
    params: () => this.name().trim() || undefined,
    stream: ({ params: artistName }) =>
      this.artistService.getArtistDetails(artistName),
  });

  readonly artistDetails = this.artistDetailsResource.value;
  readonly isLoading = this.artistDetailsResource.isLoading;
  readonly loadError = this.artistDetailsResource.error;

  protected readonly artistImageUrl = computed(() => {
    const details = this.artistDetails();

    return details
      ? getArtistImageUrl(details.artist.image, 'extralarge')
      : null;
  });
}
