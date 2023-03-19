import { Component } from 'react';

export interface ImageProps {
  src: string;
}

export class Image extends Component<ImageProps> {
  render() {
    const { src } = this.props;
    return <img className="card-image" src={src} alt="card image" />;
  }
}
