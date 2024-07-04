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
  artists = computed(() => this._artists());

  countries = signal<string[]>(['germany', 'norway', 'sweden']);
  selectedCountry = signal<string>(this.countries()[0]);

  selectCountry(country: string) {
    this.selectedCountry.set(country);
  }

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
