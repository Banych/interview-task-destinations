import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { HomePage } from '../components/pages/HomePage';
import { SearchPage } from '../components/pages/SearchPage';


const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/search',
    element: <SearchPage />
  }
]);

export default router;