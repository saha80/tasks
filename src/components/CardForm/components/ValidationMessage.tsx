import { FC } from 'react';

import { FieldError } from 'react-hook-form';

export interface ValidationMessageProps {
  fieldError: FieldError | undefined;
  children?: string;
}

export const ValidationMessage: FC<ValidationMessageProps> = ({
  fieldError,
  children,
}) => {
  return fieldError ? (
    <div className="validation-message">
      {fieldError.message} {children}
    </div>
  ) : null;
};
