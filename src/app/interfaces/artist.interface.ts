import { ArtistImage } from './artist-image.interface';
import { ArtistStats } from './artist-stats.interface';
import { ArtistBio } from './artist-bio.interface';
import { ArtistTags } from './artist-tags.interface';

export interface Artist {
  name: string;
  mbid: string;
  url: string;
  image: ArtistImage[];
  stats: ArtistStats;
  tags: ArtistTags;
  bio: ArtistBio;
}
