import { Component } from 'react';

import { Search } from '@/components/Search/Search';
import { ROOT_CHILDREN } from '@/pages/Routes';
import { withRouter, WithRouterProps } from '@/hoc/withRouter';

import { Nav } from './components/Nav';
import { pathToLinkName } from './components/Link';

import './Header.css';

class HeaderImpl extends Component<WithRouterProps> {
  render() {
    const { location } = this.props;
    return (
      <header className="header">
        <Nav routes={ROOT_CHILDREN} />
        <h4>Current path: {pathToLinkName(location.pathname)}</h4>
        <Search />
      </header>
    );
  }
}

export const Header = withRouter(HeaderImpl);
