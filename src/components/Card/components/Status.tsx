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
        <span>Likes: {likes}</span>
        <span>Views: {views}</span>
      </div>
    );
  }
}
