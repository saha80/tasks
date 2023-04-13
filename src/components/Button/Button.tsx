import { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './Button.module.css';

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

type RequiredButtonAttributes = Required<Pick<ButtonAttributes, 'type'>>;

export type ButtonProps = ButtonAttributes & RequiredButtonAttributes;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => (
    <button
      className={`${styles.button} button ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  )
);
