import React from 'react';
import { ROUTES } from '@/app/router/Router';

import './not-found.scss';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <NavLink to={ROUTES.HOME}>Go home</NavLink>
    </div>
  );
}
