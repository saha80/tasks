import { FC, ReactNode } from 'react';

export interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
}

export const Label: FC<LabelProps> = ({ htmlFor, children }) => (
  <label className="input-label" htmlFor={htmlFor}>
    {children}
  </label>
);
