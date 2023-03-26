import { FC, ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
}

export const Label: FC<LabelProps> = ({ children }) => (
  <label className="input-label">{children}</label>
);
