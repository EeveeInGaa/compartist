import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListItemComponent } from '../list-item/list-item.component';
import { SelectComponent } from '../select/select.component';
import { HttpClient } from '@angular/common/http';
import { ArtistsService } from '../../services/artists.service';
import { Artist } from '../../interfaces/artist.interface';
import { Countries } from '../../interfaces/countries.interface';
import {
  AvailableCountriesEnum,
  AvailableCountryCodesEnum,
} from '../../enums/available-countries.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'ca-artist-list',
  standalone: true,
  imports: [RouterLink, ListItemComponent, SelectComponent, TranslocoPipe],
  providers: [HttpClient, TranslocoPipe],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent {
  private readonly artistService = inject(ArtistsService);
  private readonly translocoService = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly AvailableCountries = AvailableCountriesEnum;
  readonly AvailableCountryCodes = AvailableCountryCodesEnum;

  readonly artists = signal<Artist[]>([]);

  readonly countries = signal<Countries[]>([
    {
      countryCode: this.AvailableCountryCodes.Ger,
      countryName: this.translocoService.translate(
        `${this.AvailableCountries.Germany}`,
      ),
    },
    {
      countryCode: this.AvailableCountryCodes.Nor,
      countryName: this.translocoService.translate(
        `${this.AvailableCountries.Norway}`,
      ),
    },
    {
      countryCode: this.AvailableCountryCodes.Swe,
      countryName: this.translocoService.translate(
        `${this.AvailableCountries.Sweden}`,
      ),
    },
  ]);

  readonly selectedCountry = signal<string>(this.countries()[0].countryCode);

  readonly getTopArtistsByCountry = effect(() => {
    this.artistService
      .getTopArtistsByCountry(this.selectedCountry())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const topTenArtists = response.topartists.artist.slice(0, 10);
          this.artists.set(topTenArtists);
        },
      });
  });

  selectCountry(country: string) {
    this.selectedCountry.set(country);
  }
}
