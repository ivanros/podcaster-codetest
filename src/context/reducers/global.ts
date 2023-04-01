import { Episode } from '../../models/entities/episode';
import { Action, GlobalContextType } from '../state';

const reducer = (state: GlobalContextType, action: Action) => {
  switch (action.type) {
    case 'SET_PODCAST_LIST':
      return {
        ...state,
        podcastList: action.payload,
      };
    case 'SET_PODCAST_EPISODES':
      const { podcastId, episodes } = action.payload;
      // Filters the array to prevent albums from the API from sneaking in
      const actuallyEpisodes = episodes.filter(
        (episode: Episode) => episode.kind === 'podcast-episode',
      );
      return {
        ...state,
        podcastEpisodes: { ...state.podcastEpisodes, [podcastId]: actuallyEpisodes },
      };
    default:
      return state;
  }
};

export default reducer;
