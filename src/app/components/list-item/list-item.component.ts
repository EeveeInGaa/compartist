import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Artist } from '../../utils/interfaces/artist.interface';
import { DecimalPipe } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';
import { getArtistImageUrl } from '../../utils/functions/artist-image';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ca-list-item',
  imports: [
    DecimalPipe,
    CardComponent,
    TranslocoPipe,
    TranslocoDirective,
    RouterLink,
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  artist = input<Artist>();
  number = input<number>();

  protected readonly artistName = computed(() => this.artist()?.name ?? '');

  protected readonly artistImageUrl = computed(() => {
    const artist = this.artist();

    return artist ? getArtistImageUrl(artist.image, 'large') : null;
  });
}
