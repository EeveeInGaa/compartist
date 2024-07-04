import { ArtistImage } from './artist-image.interface';

export interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: ArtistImage[];
}
