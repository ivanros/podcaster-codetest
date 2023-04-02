import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PodcastContext } from '../../context/global-context';
import { Episode } from '../../models/entities/episode';
import { millisToDateTime } from '../../utils/date.utils';
import './episode-list.styles.css';

export default function EpisodeList() {
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const { podcastId } = useParams();
  const { podcastList, podcastEpisodes } = useContext(PodcastContext);

  useEffect(() => {
    const currentEpisodes = podcastEpisodes[podcastId!];
    setEpisodes(currentEpisodes);
  }, [podcastList, podcastEpisodes, podcastId]);

  return (
    <div className="EpisodeList">
      <div className="episodes-count card">
        Episodes: <span role="episodes-count">{episodes.length}</span>
      </div>
      <div className="episodes-table card">
        {episodes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode: Episode, index: number) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                      role="episode-link"
                    >
                      {episode.trackName}
                    </Link>
                  </td>
                  <td>{new Date(episode.releaseDate).toLocaleDateString() || '-'}</td>
                  <td>{millisToDateTime(episode.trackTimeMillis) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="error-response">This podcast currently has no episodes :(</div>
        )}
      </div>
    </div>
  );
}
