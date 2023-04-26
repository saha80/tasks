import { FC } from 'react';
import { Link } from './Link';
import { RouteObjectPathRequired } from '@/routes/Routes';

export interface NavProps {
  routes: Array<RouteObjectPathRequired>;
}

export const Nav: FC<NavProps> = ({ routes }) => (
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
