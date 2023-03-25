import { FC, ReactNode } from 'react';

export interface IconProps {
  children: ReactNode;
}

export const Icon: FC<IconProps> = (props) => {
  const { children } = props;
  return <span className="search-icon">{children}</span>;
};
