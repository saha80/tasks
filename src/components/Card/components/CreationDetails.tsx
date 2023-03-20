import { Component } from 'react';

export interface CreationDetailsProps {
  createdBy: string;
  creationTimestamp: number;
  modificatoinTimestamp: number;
  tags: Array<string>;
}

export class CreationDetails extends Component<CreationDetailsProps> {
  render() {
    const { createdBy, creationTimestamp, tags } = this.props;
    return (
      <div className="card-creation-details">
        <div>
          <p className="card-author">
            Created by: <a>{createdBy}</a>
          </p>
          <p>Created at: {new Date(creationTimestamp).toDateString()}</p>
        </div>
        <span className="card-tags">
          <span>Tags: </span>
          {tags.map((tag, index) => (
            <a key={index}>{tag}</a>
          ))}
        </span>
      </div>
    );
  }
}
