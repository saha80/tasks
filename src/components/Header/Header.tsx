import { ROOT_CHILDREN } from '@/routes/Routes';
import { withRouter } from '@/hoc/withRouter';

import { Nav } from './components/Nav';
import { pathToLinkName } from './components/Link';

import './Header.css';

export const Header = withRouter(({ location }) => (
  <header className="header">
    <Nav routes={ROOT_CHILDREN} />
    {location && <h4>Current path: {pathToLinkName(location.pathname)}</h4>}
  </header>
));
