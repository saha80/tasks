import { FC } from 'react';

export interface ImageProps {
  src: string;
}

export const Image: FC<ImageProps> = ({ src }) => (
  <img className="card-image" src={src} alt="card image" />
);
