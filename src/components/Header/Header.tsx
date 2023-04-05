import { FC } from 'react';
import { ROOT_CHILDREN } from '@/routes/Routes';
import { useLocation } from 'react-router-dom';

import { Nav } from './components/Nav';
import { pathToLinkName } from './components/Link';

import './Header.css';

export const Header: FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <Nav routes={ROOT_CHILDREN} />
      <h4 className="current-path">
        Current path: {pathToLinkName(location.pathname)}
      </h4>
    </header>
  );
};
