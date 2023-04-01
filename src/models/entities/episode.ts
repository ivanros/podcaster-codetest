export interface EpisodeGenre {
  id: string;
  name: string;
}

export interface Episode {
  artistsIds: Array<number>;
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl160?: string;
  artworkUrl600?: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  description: string;
  episodeContentType: string;
  episodeFileExtension: string;
  episodeGuid: string;
  episodeUrl: string;
  feedUrl: string;
  genres: Array<EpisodeGenre>;
  kind: string;
  previewUrl: string;
  releaseDate: Date;
  shortDescription: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}
