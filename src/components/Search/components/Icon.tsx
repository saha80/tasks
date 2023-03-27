import { Component, ReactNode } from 'react';

export interface IconProps {
  children: ReactNode;
}

export class Icon extends Component<IconProps> {
  render() {
    const { children } = this.props;
    return <span className="search-icon">{children}</span>;
  }
}
