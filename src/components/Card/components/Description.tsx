import { FC } from 'react';

export interface DescriptionProps {
  description: string;
}

export const Description: FC<DescriptionProps> = ({ description }) => (
  <div className="card-description">{description}</div>
);
