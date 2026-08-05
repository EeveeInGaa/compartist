import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LastFMArtistGetInfoResponse,
  LastFMArtistSearchResponse,
  LastFMGeoGetTopArtistsResponse,
} from '../interfaces/artist.interface';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private readonly baseUrl = '/api/lastfm';
  private readonly httpClient = inject(HttpClient);

  getTopArtistsByCountry(
    country: string,
  ): Observable<LastFMGeoGetTopArtistsResponse> {
    return this.httpClient.get<LastFMGeoGetTopArtistsResponse>(this.baseUrl, {
      params: new HttpParams()
        .set('method', 'geo.gettopartists')
        .set('country', country),
    });
  }

  getArtistDetails(
    artistName: string,
  ): Observable<LastFMArtistGetInfoResponse> {
    return this.httpClient.get<LastFMArtistGetInfoResponse>(this.baseUrl, {
      params: new HttpParams()
        .set('method', 'artist.getinfo')
        .set('artist', artistName),
    });
  }

  getArtistsBySearching(term: string): Observable<LastFMArtistSearchResponse> {
    return this.httpClient.get<LastFMArtistSearchResponse>(this.baseUrl, {
      params: new HttpParams()
        .set('method', 'artist.search')
        .set('artist', term),
    });
  }
}
