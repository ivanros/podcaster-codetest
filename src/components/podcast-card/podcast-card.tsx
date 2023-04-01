import { memo } from 'react';
import './podcast-card.styles.css';

interface PodcastCardProps {
  image: string;
  title: string;
  author: string;
}

export function PodcastCard(props: PodcastCardProps) {
  const { image, title, author } = props;

  return (
    <div className="PodcastCard" role="card">
      <img
        src={image}
        className="card-image"
        height="120"
        width="120"
        alt={`podcast-card-${title}-${author}`}
      />
      <div className="card-info">
        <span className="card-title" aria-label="Podcast title">
          {title}
        </span>
        <span className="card-author" aria-label="Podcast author">
          Author: {author}
        </span>
      </div>
    </div>
  );
}

export default memo(PodcastCard);
