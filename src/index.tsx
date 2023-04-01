import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './assets/styles/index.css';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { GlobalProvider } from './context/global-context';
import App from './pages/app/app';
import EpisodeDetail from './pages/episode-detail/episode-detail';
import EpisodeList from './pages/episode-list/episode-list';
import PodcastDetail from './pages/podcast-detail/podcast-detail';
import PodcastList from './pages/podcast-list/podcast-list';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route path="/" element={<PodcastList />} />
      <Route path="podcast" element={<PodcastDetail />}>
        <Route path=":podcastId" element={<EpisodeList />} />
        <Route path=":podcastId/episode/:trackId" element={<EpisodeDetail />} />
      </Route>
    </Route>,
  ),
);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
);

// Check if hot reloading is enable. If it is, changes won't reload the page.
if (module.hot) {
  module.hot.accept();
}
