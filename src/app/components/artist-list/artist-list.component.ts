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

  private _artists = signal<Artist[]>([]);
  countries = signal<string[]>(['norway', 'sweden', 'germany']);
  selectedCountry = signal<string>('germany');

  filteredCountries = computed(() =>
    this.countries().filter((c) => c !== this.selectedCountry()),
  );

  selectCountry(country: string) {
    this.selectedCountry.set(country);
  }

  artists = computed(() => this._artists());

  ngOnInit() {
    this.artistService
      .getTopArtistsByCountry(this.selectedCountry())
      .subscribe({
        next: (response: any) => {
          const topTenArtists = response.topartists.artist.slice(0, 10);
          this._artists.set(topTenArtists);
        },
      });
  }
}
