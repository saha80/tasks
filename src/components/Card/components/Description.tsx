import { Component } from 'react';

export interface DescriptionProps {
  description: string;
}

export class Description extends Component<DescriptionProps> {
  render() {
    const { description } = this.props;
    return <div className="card-description">{description}</div>;
  }
}
