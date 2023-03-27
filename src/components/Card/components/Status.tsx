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
        <span>
          <span className="material-icons">thumb_up</span>
          {likes}
        </span>
        <span>
          <span className="material-icons">visibility</span>
          {views}
        </span>
      </div>
    );
  }
}
