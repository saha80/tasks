import { Component } from 'react';

import './Footer.css';

export class Footer extends Component<Record<string, never>, never> {
  render() {
    return (
      <footer className="footer">
        <a className="github-link" href="https://github.com/saha80/tasks">
          GitHub
        </a>
      </footer>
    );
  }
}
