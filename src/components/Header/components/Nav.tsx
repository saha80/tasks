import { FC } from 'react';
import { Link } from './Link';
import { RouteObjectPathRequired } from '@/routes/Routes';

import styles from '../Header.module.css';

export interface NavProps {
  routes: RouteObjectPathRequired[];
}

export const Nav: FC<NavProps> = ({ routes }) => (
  <nav className={styles.navigation}>
    <ul className={styles.routeList}>
      {routes.map(({ path }) => (
        <li key={path} className={styles.listItem}>
          <Link to={path} />
        </li>
      ))}
    </ul>
  </nav>
);
