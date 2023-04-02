import { FC } from 'react';

export interface TitleProps {
  title: string;
}

export const Title: FC<TitleProps> = ({ title }) => (
  <div className="card-title">{title}</div>
);
