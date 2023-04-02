import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { PodcastContext } from '../../context/global-context';
import useCachedFetch from '../../hooks/use-cached-fetch';
import { Podcast } from '../../models/entities/podcast';
import './podcast-detail.styles.css';

const LOADING_TEXTS = ['Loading your episode...', 'Looking for newest tracks...'];

export default function PodcastDetail() {
  const [podcast, setPodcast] = useState<Podcast>();
  const { podcastId } = useParams();
  const { data, loading } = useCachedFetch(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
  );
  const { podcastList, podcastEpisodes, setPodcastEpisodes } = useContext(PodcastContext);

  useEffect(() => {
    const currentPodcast = podcastList.find(
      (podcast: Podcast) => podcast.id.attributes['im:id'] === podcastId,
    );
    setPodcast(currentPodcast);
  }, [podcastList]);

  useEffect(() => {
    const episodes = (data && data.results) || [];
    setPodcastEpisodes({ podcastId, episodes });
  }, [data.results]);

  return (
    <div className="PodcastDetail">
      <div className="podcast-info card">
        {podcast ? (
          <Link to={`/podcast/${podcastId}`}>
            <img
              src={podcast['im:image'][podcast['im:image'].length - 1].label}
              className="info-image"
              height="200"
              width="200"
              alt={`podcast-card-${podcast['im:name'].label}-${podcast['im:artist'].label}`}
            />
            <hr />
            <span className="info-title" aria-label="Podcast title">
              {podcast['im:name'].label}
            </span>
            <span className="info-subtitle" aria-label="Podcast author">
              by {podcast['im:artist'].label}
            </span>
            <hr />
            <div className="info-description" aria-label="Podcast author">
              <span className="description-label">Description: </span>
              <span className="info-subtitle">{podcast.summary.label}</span>
            </div>
          </Link>
        ) : null}
      </div>
      {loading ? (
        <div className="centered-container">
          <LoadingSpinner texts={LOADING_TEXTS} />
        </div>
      ) : (
        <>
          {podcastEpisodes[podcastId!] ? (
            <Outlet />
          ) : (
            <div className="centered-container error-response">
              There was an error trying to retrieve the episode list, please try again.
            </div>
          )}
        </>
      )}
    </div>
  );
}
