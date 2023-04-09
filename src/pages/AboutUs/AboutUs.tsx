import { FC } from 'react';

import './AboutUs.css';

export const AboutUs: FC = () => (
  <div className="about-us">
    <h1>About Us</h1>
    <p>
      RS School is free-of-charge and community-based education program
      conducted by <a href="https://rollingscopes.com/">The Rolling Scopes</a>{' '}
      developer community since 2013.
    </p>
    <p>
      This application is powered by the{' '}
      <a href="https://unsplash.com/developers">Unsplash API</a>.
    </p>
  </div>
);
