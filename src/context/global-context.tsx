import { createContext, ReactNode, useReducer } from 'react';
import { Episode } from '../models/entities/episode';
import { Podcast } from '../models/entities/podcast';
import globalReducer from './reducers/global';
import { GlobalContextType, initialState } from './state';

interface GlobalProviderProps {
  children: ReactNode;
}

export const PodcastContext = createContext<Partial<GlobalContextType>>(initialState);

export const GlobalProvider = (props: GlobalProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const actions = {
    setPodcastList: (payload: Array<Podcast>) => {
      dispatch({
        type: 'SET_PODCAST_LIST',
        payload,
      });
    },
    setPodcastEpisodes: (payload: Record<string, Array<Episode>>) => {
      dispatch({
        type: 'SET_PODCAST_EPISODES',
        payload,
      });
    },
  };

  return (
    <PodcastContext.Provider value={{ ...state, ...actions }}>{children}</PodcastContext.Provider>
  );
};
