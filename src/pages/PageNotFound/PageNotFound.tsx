import { Component } from 'react';

import './PageNotFound.css';

export class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <h1>404 Page Not Found</h1>
        <a href="/">Go to Home</a>
      </div>
    );
  }
}
