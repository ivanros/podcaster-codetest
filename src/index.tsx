import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './assets/styles/index.css';
import App from './pages/app/app';

const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<App />} />));

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// Check if hot reloading is enable. If it is, changes won't reload the page.
if (module.hot) {
  module.hot.accept();
}
