import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import {
  LoadingSpinner,
  LOADING_TEXT_INTERVAL,
} from '../src/components/loading-spinner/loading-spinner';

describe('LoadingSpinner', () => {
  it('checks that spinner icon is visible', async () => {
    render(<LoadingSpinner />);

    const elLoader = screen.getByRole('loader');

    expect(elLoader).toBeInTheDocument();
    // Checks svg accessibility via aria-hidden attribute
    expect(within(elLoader).getByRole('svg', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByLabelText('Loading texts')).not.toBeInTheDocument();
  });

  it('checks that loading texts are working dynamically right', async () => {
    jest.useFakeTimers();
    const texts = ['Loading one...', 'Loading two...', 'Loading three...'];

    render(<LoadingSpinner texts={texts} />);

    expect(screen.queryByLabelText('Loading texts')).toHaveTextContent(texts[0]);

    act(() => {
      // Fast-forward until next loading text is displayed
      jest.advanceTimersByTime(LOADING_TEXT_INTERVAL);
    });

    expect(screen.queryByLabelText('Loading texts')).toHaveTextContent(texts[1]);

    act(() => {
      // Fast-forward until next loading text is displayed
      jest.advanceTimersByTime(LOADING_TEXT_INTERVAL);
    });

    expect(screen.queryByLabelText('Loading texts')).toHaveTextContent(texts[2]);

    act(() => {
      // Fast-forward until returns to the initial loading text
      jest.advanceTimersByTime(LOADING_TEXT_INTERVAL);
    });

    expect(screen.queryByLabelText('Loading texts')).toHaveTextContent(texts[0]);
  });
});
