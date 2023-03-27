import { Component } from 'react';

export interface TitleProps {
  title: string;
}

export class Title extends Component<TitleProps> {
  render() {
    const { title } = this.props;
    return <div className="card-title">{title}</div>;
  }
}
