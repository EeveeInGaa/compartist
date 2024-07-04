import {
  Component,
  computed,
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

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [RouterLink, ListItemComponent, SelectComponent],
  providers: [HttpClient],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css',
})
export class ArtistListComponent implements OnInit {
  private artistService = inject(ArtistsService);

  readonly AvailableCountries = AvailableCountriesEnum;
  readonly AvailableCountryCodes = AvailableCountryCodesEnum;

  readonly artists = signal<Artist[]>([]);

  countries = signal<Countries[]>([
    {
      countryCode: this.AvailableCountryCodes.Ger,
      countryName: this.AvailableCountries.Germany,
    },
    {
      countryCode: this.AvailableCountryCodes.Nor,
      countryName: this.AvailableCountries.Norway,
    },
    {
      countryCode: this.AvailableCountryCodes.Swe,
      countryName: this.AvailableCountries.Sweden,
    },
  ]);
  selectedCountry = signal<string>(this.countries()[0].countryCode);

  selectCountry(country: string) {
    this.selectedCountry.set(country);
  }

  ngOnInit() {
    this.artistService
      .getTopArtistsByCountry(this.selectedCountry())
      .subscribe({
        next: (response: any) => {
          const topTenArtists = response.topartists.artist.slice(0, 10);
          this.artists.set(topTenArtists);
        },
      });
  }
}
