import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './assets/styles/index.css';
import { GlobalProvider } from './context/global-context';
import App from './pages/app/app';
import PodcastList from './pages/podcast-list/podcast-list';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<PodcastList />} />
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
