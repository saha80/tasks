import { Component } from 'react';

import './AboutUs.css';

export class AboutUs extends Component {
  render() {
    return (
      <div className="about-us">
        <h1>About Us</h1>
        <p>
          RS School is free-of-charge and community-based education program conducted by{' '}
          <a href="https://rollingscopes.com/">The Rolling Scopes</a> developer community since
          2013.
        </p>
      </div>
    );
  }
}
