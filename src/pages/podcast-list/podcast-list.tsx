import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PodcastContext } from '../../context/global-context';
import './podcast-list.styles.css';

export default function PodcastList() {
  const [filteredPodcasts, setFilteredPodcasts] = useState<Array<any>>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const { podcastList } = useContext(PodcastContext);

  useEffect(() => {
    if (!podcastList) return;
    console.log(podcastList);
    const newPodcasts = podcastList.filter(
      (podcast: any) =>
        podcast['im:name'].label.toLowerCase().includes(searchBy.toLowerCase()) ||
        podcast['im:artist'].label.toLowerCase().includes(searchBy.toLowerCase()),
    );
    setFilteredPodcasts(newPodcasts);
  }, [searchBy, podcastList]);

  return (
    <div className="PodcastList">
      <div className="podcast-container">
        <div className="podcast-filter">
          <label role="count">{filteredPodcasts.length}</label>
          <input
            type="text"
            role="filter"
            placeholder="Filter podcasts..."
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          />
        </div>
        <div className="podcast-grid">
          {filteredPodcasts.map((podcast: any, index: number) => (
            <Link to={`/podcast/${podcast.id.attributes['im:id']}`} key={index} role="link">
              <span>{podcast['im:name'].label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
