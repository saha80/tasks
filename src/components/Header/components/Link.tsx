import { type FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROOT_PATH } from '@/routes/Routes';

import styles from '../Header.module.css';

export const pathToLinkName = (path: string) =>
  path === ROOT_PATH
    ? 'Home'
    : path
        .replace('/', '')
        .split('-')
        .map((v) => `${v[0].toUpperCase()}${v.substring(1)}`)
        .join(' ');

export interface LinkProps {
  to: string;
}

export const Link: FC<LinkProps> = ({ to: path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `${isActive ? styles.active : ''} ${styles.link}`
    }
  >
    {pathToLinkName(path)}
  </NavLink>
);
