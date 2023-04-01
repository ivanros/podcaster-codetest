import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastContext } from '../../context/global-context';
import { Episode } from '../../models/entities/episode';
import './episode-detail.styles.css';

export default function EpisodeDetail() {
  const [episode, setEpisode] = useState<Episode>();
  const { podcastId, trackId } = useParams();
  const { podcastEpisodes } = useContext(PodcastContext);

  useEffect(() => {
    if (!podcastId || !trackId) return;
    const currentEpisode = podcastEpisodes[podcastId].find(
      (episode: Episode) => episode.trackId === +trackId,
    );
    setEpisode(currentEpisode);
  }, [podcastEpisodes, podcastId, trackId]);

  return (
    <div className="EpisodeDetail">
      <div className="episode-info card">
        {episode ? (
          <>
            <div className="episode-title" aria-label="Episode title">
              {episode.trackName}
            </div>
            <div
              className="episode-description"
              aria-label="Episode description"
              // TODO: Possible vulnerability, use external library that parses description via regexp
              dangerouslySetInnerHTML={{ __html: episode.description || episode.shortDescription }}
            ></div>
            <audio src={episode.episodeUrl} controls>
              Your browser does not support the audio element.
            </audio>
          </>
        ) : null}
      </div>
    </div>
  );
}
