import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROOT_PATH } from '@/routes/Routes';

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

export class Link extends Component<LinkProps> {
  render() {
    const { to: path } = this.props;

    return (
      <NavLink to={path} className={({ isActive }) => `${isActive ? 'current' : ''} link`}>
        {pathToLinkName(path)}
      </NavLink>
    );
  }
}
