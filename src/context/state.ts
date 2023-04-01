import { Episode } from '../models/entities/episode';
import { Podcast } from '../models/entities/podcast';

export interface GlobalContextType {
  podcastList: Array<Podcast>;
  podcastEpisodes: Record<string, Array<Episode>>;
  setPodcastList: Function;
  setPodcastEpisodes: Function;
}

export interface Action {
  type: string;
  payload: any;
}

export const initialState = {
  podcastList: [],
  podcastEpisodes: {},
};
