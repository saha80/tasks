import { Component } from 'react';

export interface StatusProps {
  likes: number;
  views: number;
}

export class Status extends Component<StatusProps> {
  render() {
    const { likes, views } = this.props;
    return (
      <div className="card-status">
        <span>👍 {likes}</span>
        <span>👁 {views}</span>
      </div>
    );
  }
}
