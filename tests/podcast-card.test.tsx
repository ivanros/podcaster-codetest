import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PodcastCard } from '../src/components/podcast-card/podcast-card';

const mockProps = {
  image: 'http://example.com/podcastimage.png',
  title: 'Jest Podcast',
  author: 'Jester Testingman',
};

describe('PodcastCard', () => {
  it('checks that card elements are displayed correctly', async () => {
    render(<PodcastCard {...mockProps} />);

    expect(
      screen.queryByAltText(`podcast-card-${mockProps.title}-${mockProps.author}`),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Podcast title')).toHaveTextContent(mockProps.title);
    expect(screen.getByLabelText('Podcast author')).toHaveTextContent(mockProps.author);
  });
});
