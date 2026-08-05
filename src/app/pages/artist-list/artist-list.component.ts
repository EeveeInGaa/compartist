import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { SelectComponent } from '../../components/select/select.component';
import { ArtistsService } from '../../utils/services/artists.service';
import { Artist } from '../../utils/interfaces/artist.interface';
import { Countries } from '../../utils/interfaces/countries.interface';
import {
  AvailableCountriesEnum,
  AvailableCountryCodesEnum,
} from '../../utils/enums/available-countries.enum';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ca-artist-list',
  imports: [ListItemComponent, SelectComponent, TranslocoPipe],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent {
  private readonly artistService = inject(ArtistsService);
  private readonly router = inject(Router);

  readonly AvailableCountries = AvailableCountriesEnum;
  readonly AvailableCountryCodes = AvailableCountryCodesEnum;

  readonly countries = signal<Countries[]>([
    {
      countryCode: this.AvailableCountryCodes.Ger,
      translationKey: this.AvailableCountries.Germany,
    },
    {
      countryCode: this.AvailableCountryCodes.Nor,
      translationKey: this.AvailableCountries.Norway,
    },
    {
      countryCode: this.AvailableCountryCodes.Swe,
      translationKey: this.AvailableCountries.Sweden,
    },
  ]);

  readonly selectedCountry = signal<string>(this.countries()[0].countryCode);

  private readonly artistsResource = rxResource({
    params: () => this.selectedCountry(),
    stream: ({ params: country }) =>
      this.artistService
        .getTopArtistsByCountry(country)
        .pipe(map((response) => response.topartists.artist.slice(0, 10))),
    defaultValue: [] as Artist[],
  });

  readonly artists = this.artistsResource.value;
  readonly isLoading = this.artistsResource.isLoading;
  readonly loadError = this.artistsResource.error;
  readonly hasArtists = computed(() => this.artists().length > 0);

  selectCountry(country: string): void {
    this.selectedCountry.set(country);
  }

  goToDetails(name: string): void {
    void this.router.navigate(['artist-list/detail', name]);
  }
}
