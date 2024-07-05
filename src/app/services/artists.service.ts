import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  baseUrl = 'http://ws.audioscrobbler.com/2.0';

  private apiKey = environment.API_KEY;
  private httpClient = inject(HttpClient);

  getTopArtistsByCountry(country: string) {
    return this.httpClient.get(
      `${this.baseUrl}/?method=geo.gettopartists&country=${country}&api_key=${this.apiKey}&format=json`,
    );
  }
}