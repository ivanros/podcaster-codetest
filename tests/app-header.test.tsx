import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from '../src/components/app-header/app-header';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigation: () => jest.fn(),
}));

describe('AppHeader', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AppHeader />
      </BrowserRouter>,
    );
  });

  it('checks that title is visible and loader is hidden', async () => {
    expect(screen.getByLabelText('Header title')).toHaveTextContent(/Podcaster/i);
    expect(screen.queryByRole('loader')).toBeInTheDocument();
  });
});
