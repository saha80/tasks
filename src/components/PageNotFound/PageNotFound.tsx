import { Component } from 'react';

export class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <span>404 Page Not Found</span>
        <a href="/">Go to Home</a>
      </div>
    );
  }
}
