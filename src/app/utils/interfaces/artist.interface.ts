import { ArtistImage } from './artist-image.interface';
import { ArtistTags } from './artist-tags.interface';
import { ArtistStats } from './artist-stats.interface';
import { ArtistBio } from './artist-bio.interface';

export interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: ArtistImage[];
}

/*
 * copied from: https://github.com/scriptex/lastfm-ts-api/blob/main/src/types.ts to be sure the typing is right (also double-checked it with requests in Postman);
 * in another context/bigger project I would have considered to install it,
 * but didn't do it here to keep the project size as small as possible
 * */
export interface LastFMGeoGetTopArtistsResponse {
  topartists: {
    artist: Artist[];
  };
}

export interface LastFMArtistSearchResponse {
  results: {
    artistmatches: {
      artist: Artist[];
    };
  };
}

export interface LastFMArtistGetInfoResponse {
  artist: {
    name: string;
    mbid: string;
    url: string;
    image: ArtistImage[];
    streamable: 0 | 1;
    ontour: 0 | 1;
    stats: ArtistStats;
    tags: {
      tag: ArtistTags[];
    };
    bio: ArtistBio;
  };
}
