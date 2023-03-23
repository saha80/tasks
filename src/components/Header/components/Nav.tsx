import { Component } from 'react';
import { Link } from './Link';
import { RouteObjectPathRequired } from '@/routes/Routes';

export interface NavProps {
  routes: Array<RouteObjectPathRequired>;
}

export class Nav extends Component<NavProps> {
  render() {
    const { routes } = this.props;
    return (
      <nav className="header-nav">
        <ul className="header-route-list">
          {routes.map(({ path }, index) => (
            <li key={index} className="list-item">
              <Link to={path} />
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
