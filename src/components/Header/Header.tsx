import { FC } from 'react';
import { ROOT_CHILDREN } from '@/routes/Routes';
import { useLocation } from 'react-router-dom';

import { Nav } from './components/Nav';
import { pathToLinkName } from './components/Link';

import styles from './Header.module.css';

export const Header: FC = () => {
  const location = useLocation();

  return (
    <header className={`${styles.header} header`}>
      <Nav routes={ROOT_CHILDREN} />
      <h4 className={styles.currentPath}>
        Current path: {pathToLinkName(location.pathname)}
      </h4>
    </header>
  );
};
