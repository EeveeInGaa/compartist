import { ArtistImage } from '../interfaces/artist-image.interface';

export function getArtistImageUrl(
  images: readonly ArtistImage[],
  preferredSize: ArtistImage['size'] = 'large',
): string | undefined {
  const image =
    images.find((candidate) => candidate.size === preferredSize) ??
    images.findLast((candidate) => candidate['#text'].trim() !== '');

  return image?.['#text'].trim();
}
