import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/app-header/app-header';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { PodcastContext } from '../../context/global-context';
import useFetch from '../../hooks/use-fetch';
import './app.styles.css';

const LOADING_TEXTS = [
  'Loading your favourites podcasts...',
  'Looking for copyright licenses...',
  'Tuning the instruments...',
];

export default function App() {
  const { data, loading, error } = useFetch(
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
  );
  const { setPodcastList } = useContext<any>(PodcastContext);

  useEffect(() => {
    const podcasts = (data && data.feed && data.feed.entry) || [];
    setPodcastList(podcasts);
  }, [data]);

  return (
    <div className="App">
      <AppHeader />
      <div className="Router-content">
        {loading ? (
          <LoadingSpinner texts={LOADING_TEXTS} />
        ) : (
          <>
            {error ? (
              <div className="error-response">
                There was an error trying to retrieve the podcast list, please try again.
              </div>
            ) : (
              <Outlet />
            )}
          </>
        )}
      </div>
    </div>
  );
}
