import { FC } from 'react';

export interface StatusProps {
  likes: number;
  views: number;
}

export const Status: FC<StatusProps> = ({ likes, views }) => (
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
